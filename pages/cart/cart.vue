<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址组件 -->
		<my-address></my-address>
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="cart" size="30"></uni-icons>
			<!-- 右侧文本-->
			<text>购物车({{total}})</text>
		</view>

		<!-- 渲染购物车列表 -->
		<uni-swipe-action>
			<block class="" v-for="(goods, index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="deleteGoods(goods)"
					@change="change">
					<my-goods :goods="goods" :showRadio="true" :show-number-box="true"
						@radio-change="radioChangeHandler" @num-change="changeGoodsCount"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		
		<!-- 使用结算组件 -->
		<my-settle-components></my-settle-components>
	</view>
	
	<view class="empty-cart-container" v-else>
		
		<image src="@/static/cart_empty@2x.png" mode=""></image>
		<text>空空如也~~</text>
		
	</view>
	
</template>


<script>
	import {
		mapState,
		mapMutations,
		mapGetters,
		useStore
	} from 'vuex';


	import yya from '@/mixins/useBadge.js'


	export default {
		// mixins:[badgeMix],*/

		setup() {
			const {
				total,
				checkCount,
				setBadge,
				updateBadge
			} = yya()
			return {
				total,
				checkCount,
				setBadge,
				updateBadge
			}
		},

		computed: {
			...mapState('cart', ['cart']),


		},
		
		watch:{
			total(){
				this.setBadge()
			}
			
		},

		onShow() {
			this.setBadge()
		},

		onLoad() {

		},


		data() {
			return {
				options:[
				        {
				            text: '删除',
				            style: {
				                backgroundColor: '#dd524d'
				            }
				        }
				      ]
			};
		},

		methods: {
			...mapMutations('cart', ['updateCart', 'updateGoodsCount','deleteCartGoods']),
			radioChangeHandler(e) {
				this.updateCart(e)
			},

			changeGoodsCount(e) {
				this.updateGoodsCount(e)
				// this.setBadge()

			},
			
			deleteGoods(goods){
				// console.log(goods)
				this.deleteCartGoods(goods)
				// this.setBadge()
			}
		}
	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 50px;
	}
	
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid darkgrey;

		text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
	
	.empty-cart-container{
		display: flex;
		flex-direction: column;
		
		justify-content: center;
		align-items: center;
		padding-top: 150px;
		
		image{
			width:90px;
			height: 90px;
		}
		
	}
</style>