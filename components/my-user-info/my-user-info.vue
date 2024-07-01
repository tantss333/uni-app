<template>
	<view class="my-userinfo-container">
		<!-- 头像名称区域 -->
		<view class="top-box">
			<image :src="userInfo.avatarUrl" mode="" class='avatar'></image>
			<view class="nickname">
				{{userInfo.nickName}}
			</view>
		</view>

		<!-- 用户信息面板 -->
		<view class="panel-list">

			<!-- 第1个面板 -->
			<view class="panel-1">

				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>

					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>

					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>

					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>

				</view>

			</view>


			<!-- 第2个面板 -->

			<view class="panel-2">

				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">

					<view class="panel-item">
						<image src="../../static/my-icons/icon1.png" mode=""></image>
						<text>待付款</text>
					</view>

					<view class="panel-item">
						<image src="@/static/my-icons/icon2.png" mode=""></image>
						<text>待收货</text>
					</view>

					<view class="panel-item">
						<image src="@/static/my-icons/icon3.png" mode=""></image>
						<text>退款/退货</text>
					</view>

					<view class="panel-item">
						<image src="@/static/my-icons/icon4.png" mode=""></image>
						<text>全部订单</text>
					</view>

				</view>

			</view>

			<!-- 第3个面板 -->
			
			
			<view class="panel-3">
			
				<view class="panel-body">
			
					<view class="panel-item">
						<text>收货地址</text>
						<uni-icons type="right"></uni-icons>
					</view>
			
					<view class="panel-item">
						<text>联系客服</text>
						<uni-icons type="right"></uni-icons>
					</view>
			
					<view class="panel-item" @click="logout">
						
						<text>退出登录</text>
						<uni-icons type="right"></uni-icons>
					</view>
					
					
					
				</view>
			
			</view>


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
		name: "my-user-info",

		computed: {
			...mapState('user', ['userInfo'])
		},

		onLoad() {
			console.log('hahah')
		},


		data() {
			return {
				
			};
		}, 
		
		methods:{
			
			...mapMutations('user',['updateUserInfo','updateToken','updateAddress','updateRedirectUrl']),
			async logout(){
				const res = await uni.showModal({
					title:"提示",
					content:"确认退出账号?",
				}).catch((err) =>console.log(err));
				
				if (res.confirm){
					this.updateAddress({})
					this.updateUserInfo({})
					this.updateToken('');
					this.updateRedirectUrl(null)
				} else if (res.cancel){
					uni.showMsg('取消登出')
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-userinfo-container {
		background-color: lightgrey;
		height: 100%;

		.top-box {

			height: 400rpx;
			background-color: red;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.avatar {
				width: 80px;
				height: 80px;
				border-radius: 45px;
				border: 2px solid white
			}

			.nickname {
				color: white;
				margin-top: 5px;
			}
		}


		.panel-list {
			padding: 0 10px;
			position: relative;
			top: -10px;

			.panel-1 {

				background-color: white;

				border-radius: 3px;
				margin-bottom: 8px;

				.panel-body {
					display: flex;
					justify-content: space-around;
					align-items: center;

					.panel-item {
						display: flex;
						flex-direction: column;

						align-items: center;
						font-size: 13px;
						padding: 10px 0;


					}
				}
			}

			;

			.panel-2 {

				background-color: white;
				border-radius: 3px;
				margin-bottom: 8px;

				.panel-title {
					padding: 5px 5px;
					border-bottom: 1px solid darkgrey
				};

				.panel-body {
					display: flex;
					justify-content: space-around;
					align-items: center;

					.panel-item {
						display: flex;
						flex-direction: column;

						align-items: center;
						font-size: 13px;
						padding: 10px 0;

						image {
							width: 35px;
							height: 35px;
						}


					}
				}

			};
			
			
			.panel-3 {
			
				background-color: white;
				border-radius: 3px;
				margin-bottom: 8px;
			
				.panel-body {
					display: flex;
					flex-direction: column;					
			
					.panel-item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 14px;
						padding: 10px 10px;
					
						
			
					}
				}
			
			}
			

		}
	}
</style>