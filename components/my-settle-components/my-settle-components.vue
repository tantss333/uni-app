<template>
	<view class="my-settle-container">
		<view class="my-settle-left">
			<radio :checked="isFullCheck" color="red" style="transform:scale(0.7)" @click="changeAllGoodsState"></radio>

			<text>全选</text>

			<view class="amount">
				合计: ${{checkGoodsAmount}}
			</view>

		</view>


		<view class="my-settle-right" @click="settlement">
			<text>结算({{checkCount}})</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters,
		useStore
	} from 'vuex';




	export default {
		name: "my-settle-components",

		computed: {
			...mapGetters('cart', ['checkCount', 'total', 'checkGoodsAmount']),
			...mapGetters('user', ['addStr']),
			...mapState('user', ['address', 'token', 'redirectUrl']),
			...mapState('cart', ['cart']),
			isFullCheck() {
				return this.total === this.checkCount
			}
		},

		data() {
			return {
				timer: null,
				seconds: 3
			};
		},

		methods: {
			...mapMutations('cart', ['updateAllGoodsState']),
			...mapMutations('user', ['updateRedirectUrl']),

			changeAllGoodsState() {
				this.updateAllGoodsState(!this.isFullCheck)
			},

			settlement() {

				if (!this.checkCount) return uni.showMsg('请选择要结算的商品');

				if (!this.addStr) return uni.showMsg('请选择收货地址');

				if (!this.token) return this.delayNavigate();

				this.payOrder()
			},

			// 展示倒计时
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请登录后再结算！' + n + '秒后自动跳转到登录页',
					mask: true,
					duration: 1500
				})
			},

			// 延时导航到My页面
			delayNavigate() {
				this.showTips(this.seconds);

				this.timer = setInterval(() => {
					this.seconds--;

					if (this.seconds <= 0) {
						clearInterval(this.timer);


						this.updateRedirectUrl('/pages/cart/cart')


						uni.switchTab({
							url: '/pages/my/my'
						})

						return

					}

					this.showTips(this.seconds)
				}, 1000)

			},

			async payOrder() {
				// 1.创建订单
				const orderInfo = {
					// order_price:this.checkGoodsAmount,
					order_price: 0.001,
					consignee_addr: this.addStr,
					goods: this.cart.filter((x) => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price
					}))

				};


				const {data:res} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				if (res.meta.status !== 200){return uni.showMsg('创建订单失败')}
				
				const orderNumber = res.message.order_number
				
				const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {'order_number': orderNumber})
				
				if (res2.meta.status !== 200){return uni.showMsg('创建预付订单失败!')}
				
				const payInfo = res2.message.pay
				
				try{
					const res3 = await uni.requestPayment(payInfo).catch()
				}catch(e){
					
					console.log('支付失败:'+e.errMsg)
					return uni.showMsg('支付失败:'+e.errMsg)
				}
				
				console.log(res3)
				
				
			}

		}


	}
</script>

<style lang="scss">
	.my-settle-container {
		height: 50px;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		background-color: white;
		align-items: center;
		font-size: 14px;

		.my-settle-left {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.amount {
				padding-left: 40px;
			}

			;
			white-space: nowrap;
		}

		.my-settle-right {
			display: flex;
			background-color: red;
			height: 100%;
			width: 33%;
			justify-content: center;
			align-items: center;

			color: white;
		}

	}
</style>