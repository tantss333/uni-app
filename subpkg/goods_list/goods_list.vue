<template>
	<view>
		<view class="goods-list">

			<view class="goods-item" v-for="(item, index) in goodsList" :key="index" @click="gotoGoodsDetail(item)">

				<view class="goods-item-left">
					<image class="goods-image" :src="item.goods_small_logo || default_img" mode=""></image>
				</view>

				<view class="goods-item-right">
					<view class="goods-name">{{item.goods_name}}</view>
					<view class="goods-price">
						￥{{Number(item.goods_price).toFixed(2)}}
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	export default {



		data() {
			return {

				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},

				goodsList: [],
				total: 0,
				default_img: '/static/uni.png',
				isLoading: false
			};
		},




		onLoad(options) {

			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},

		onReachBottom() {
			
			if (this.queryObj.pagenum * this.queryObj.pagesize>=this.total){return uni.showMsg('无更多数据')}
			
			if (this.isLoading) {
				return
			} else {
				this.queryObj.pagenum += 1;
				this.getGoodsList()
			}


		},
		
		onPullDownRefresh() {
			this.queryObj.pagenum = 1,
			this.queryObj.total = 0,
			this.isLoading = false,
			this.goodsList = [];
			
			this.getGoodsList(()=> {uni.stopPullDownRefresh()})
		},
		
		


		methods: {
			async getGoodsList(cb) {
				
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				
				
				cb && cb()
				if (res.meta.status !== 200) {
					return uni.showMsg()
				} else {

					this.goodsList = [...this.goodsList, ...res.message.goods]
					this.total = res.message.total
					this.isLoading = false
				};
				
				
				
			},
			
			gotoGoodsDetail(goods){
				
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
				
				// if (res.meta.status !== 200) {
				// 	return uni.showMsg()
				// } else {
				
				// 	this.goodsList = [...this.goodsList, ...res.message.goods]
				// 	this.total = res.message.total
				// 	this.isLoading = false
				// };
			}

		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		margin: 5px 5px;
		border-bottom: 1px solid antiquewhite;

		.goods-item-left {

			margin-right: 5px;

			.goods-image {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {

			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;

			}

			.goods-price {
				color: red;
			}
		}

	}
</style>