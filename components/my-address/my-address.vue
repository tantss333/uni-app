<template>
	<view>
		
		<!-- 收货地址盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
			
		</view>
		
		
		<!-- 渲染收货信息盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="receiver">
						收货人: {{address.userName}}
					</view>
				</view>
				
				<view class="row1-right">
					<view class="phone">
						电话: {{address.telNumber}}
					</view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址: 
				</view>
				<view class="row2-right">
					{{addStr}}
				</view>
			</view>
		
		</view>
		
		<image src="@/static/cart_border@2x.png" class="address-border"></image>
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
		name:"my-address",
		data() {
			return {
			};
		},
		
		computed:{
			
			...mapState('user',['address']),
			
			...mapGetters('user',['addStr'])
		},
		
		methods:{
			
			...mapMutations('user',['updateAddress']),
			async chooseAddress(){
				const res = await uni.chooseAddress({
					
				}).catch(err => {console.log(err)})
				
				
				if (res.errMsg === "chooseAddress:ok") {
					
					this.updateAddress(res)
				}
				
				
			}
		}
	}
</script>

<style lang="scss">
	
	.address-info-box{
	
		font-size: 12px;
		height: 80px;
		flex-direction: column;
		padding: 10px 10px;
		justify-content: center;
		
		.row1 {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
			
			.row1-right{
				display: flex;
				justify-content: space-between
			}
			
		};
		
		.row2{
			display: flex;
			// justify-content: space-between;
			align-items: center;
			
			.row2-left{
				white-space: nowrap;
			};
			
			.row2-right{
				padding: 0 20px;
			}
			
		}
		
	}
	
	
	.address-border{
		display: block;
		width: 100%;
		height: 5px;
	}
	.address-choose-box{
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

</style>