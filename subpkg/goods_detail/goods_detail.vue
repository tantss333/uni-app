<template>
	<view v-if="goods_info.goods_name">
		<swiper class="swiper-container" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="swiperitem" v-for="(item, index) in goods_info.pics" :key="index">
				<image class="image" :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>


		<!-- 商品信息区域 -->

		<view class="goods-info-box">

			<!-- 商品价格 -->
			<view class="price">
				￥{{Number(goods_info.goods_price).toFixed(2)}}
			</view>

			<!-- 商品信息主体区域 -->
			<view class="goods-info-body">
				<!-- 左侧商品名字 -->
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<!-- 收藏区 -->
				<view class="fav">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>

			<!-- 运费 -->

			<view class="yf">
				快递·免运费---{{total}}
				
			</view>

		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	
	
	
	export default {
		
		watch: {

			total: {
				handler(newValue) {

					const findResult = this.options.find((x) => x.text === "购物车")
					if (!findResult) {
						uni.showMsg('无法添加购物车')
						return
					}

					findResult.info = newValue
					uni.setStorageSync("historyResults", this.historyResults)
				},
				immediate:true

			}
		},

		computed: {
			...mapState('cart', ['cart']),
			...mapGetters('cart',['total'])
		
		},


		data() {
			return {
				goods_id: '',
				goods_info: {},
				msg : "",

				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]

			}
		},

		onLoad(e) {
			
			this.goods_id = e.goods_id
			this.getGoodsDetail(this.goods_id)
			
		},


		methods: {

			...mapMutations('cart', ['addToCart']),

			async getGoodsDetail() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id: this.goods_id
				})
				if (res.meta.status !== 200) {
					uni.showMsg('请求数据失败')
				} else {

					res.message.goods_introduce = res.message.goods_introduce.replace(/webp/g, 'jpg')
					this.goods_info = res.message
				}
			},

			preview(i) {
				uni.previewImage({
					current: i,

					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},

			onClick(e) {

				if (e.content.text === "购物车") {
					uni.switchTab({
						url: "/pages/cart/cart"
					})
				}
			},

			buttonClick(e) {

				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_price: this.goods_info.goods_price,
						goods_count: 1,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true
					};

					this.addToCart(goods)


				} else {

				}
			}

		},
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		.swiperitem {

			.image {
				height: 100%;
				width: 100%;
			}
		}
	}

	.goods-info-box {

		padding: 10px;
		padding-right: 0;

		.price {
			color: red;
			font-size: 18px;
			margin: 10px 0;

		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				margin-right: 10px;
			}

			.fav {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid darkgrey;
				color: gray;
			}

		}

		.yf {
			font-size: 12px;
			color: grey;
			margin: 10px 0;
		}
	}

	.goods_nav {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>