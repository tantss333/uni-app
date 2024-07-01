<template>
	<view class="login-container">
		<view class="login-box">
			<uni-icons type='contact-filled' size="100"></uni-icons>
			<button type="primary" class="btn-login" open-type="getUserInfo" @click="toLogin">一键登录</button>
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
		name: "my-login",
		data() {
			return {

			};
		},
		
		computed:{
			...mapState('user',['token','redirectUrl'])
		},
		

		methods: {
			...mapMutations('user', ['updateUserInfo', 'updateToken']),
			async toLogin(e) {

				uni.getUserProfile({
					desc: '获取用户登录授权',

					success: (result) => {

						this.updateUserInfo(result.userInfo);
						this.getToken(result)
						// console.log(this.redirectUrl)
						if (this.redirectUrl && this.redirectUrl !== ''){
							uni.switchTab({
								url:this.redirectUrl
							})
						}

					},



					fail: (error) => {
						if (error['errMsg'] === "getUserProfile:fail auth deny") {
							return uni.showMsg('用户取消授权')
						}
					}
				})

			},


			async getToken(detail) {
				const res = await uni.login().catch((err) => {
					console.log(err)
				});


				if (res.errMsg !== "login:ok") {
					return uni.showMsg('用户登陆失败')
				} else {
					const query = {
						code: res.code,
						encryptedData: detail.encryptedData,
						iv: detail.iv,
						rawData: detail.rawData,
						signature: detail.signature
					};


					let result = await this.login(query)

					if (result.meta.status !== 200) {
						return uni.showMsg('登陆失败')
					} else {
						
						this.updateToken(result.message.token)
						return uni.showMsg('登陆成功')
					}

				}

			},

			async login(query) {
				let {
					data: res
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				
				console.log(res)
				// res = {
				// 	"message": {
				// 		"user_id": 23,
				// 		"user_email_code": null,
				// 		"is_active": null,
				// 		"user_sex": "男",
				// 		"user_qq": "",
				// 		"user_tel": "",
				// 		"user_xueli": "本科",
				// 		"user_hobby": "",
				// 		"user_introduce": null,
				// 		"create_time": 1562221487,
				// 		"update_time": 1562221487,
				// 		"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
				// 	},
				// 	"meta": {
				// 		"msg": "登录成功",
				// 		"status": 200
				// 	}
				// }


				return res
			}
		}

	}
</script>

<style lang="scss">
	.login-container {
		background-color: white;
		height: 1000rpx;
		width: 100%;


		.login-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 750rpx;
			background-color: aliceblue;
			justify-content: center;
			position: relative;
			overflow: hidden;

			&::after {
				content: ' ';
				display: block;
				width: 100%;
				height: 40px;
				background-color: white;
				position: absolute;
				bottom: 0;
				left: o;
				border-radius: 100%;
				transform: translateY(50%);

			}

			.btn-login {
				background-color: red;
				margin: 15px 0;
				border-radius: 100px;
				width: 90%;
			}
		}
	}
</style>