<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="red" v-if="showRadio" style="transform:scale(0.7)"
				@click="radioClickHandler"></radio>
			<image class="goods-image" :src="goods.goods_small_logo || default_img" mode=""></image>
		</view>

		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>

			<view class="goods-info">
				<view class="goods-price">
					￥{{Number(goods.goods_price).toFixed(2)}}
				</view>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNumberBox" @change="changeGoodsCount"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",

		props: {
			goods: {
				typeo: Object,
				default: {}
			},

			showRadio: {
				type: Boolean,
				default: false
			},
			
			showNumberBox:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				default_img: '/static/uni.png'
			};
		},

		methods: {
			radioClickHandler() {

				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state,
					goods_count:this.goods.goods_count
				})
			},
			
			
			changeGoodsCount(e){
				
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count:e-0
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		// margin: 5px 5px;
		border-bottom: 1px solid antiquewhite;
		background-color: white;
		padding-left: 5px;
		padding-right: 5px;
		padding-top: 5px;

		.goods-item-left {
			display: flex;
			margin-right: 10px;
			align-items: center;
			justify-content: space-between;

			.goods-image {
				width: 100px;
				height: 100px;
				display: block;
			}

			;

		}

		.goods-item-right {

			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			padding-bottom: 10px;

			.goods-name {
				font-size: 13px;
			}
			
			.goods-info{
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.goods-price {
					color: red;
					font-size: 14px;
				}
			}

			
		}

	}
</style>