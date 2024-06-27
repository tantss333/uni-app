<template>
	<view class="my-settle-container">
		<view class="my-settle-left">
			<radio :checked="isFullCheck" color="red" style="transform:scale(0.7)"
				@click="changeAllGoodsState"></radio>
			
			<text>全选</text>
			
			<view class="amount">
				合计: ${{checkGoodsAmount}}
			</view>
			
		</view>
		
		
		<view class="my-settle-right">
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
		name:"my-settle-components",
		
		computed:{
			...mapGetters('cart',['checkCount','total', 'checkGoodsAmount']),
			isFullCheck(){
				return this.total === this.checkCount
			}
		},
		
		data() {
			return {
				
			};
		},
		
		methods:{
			...mapMutations('cart',['updateAllGoodsState']),
			
			changeAllGoodsState(){
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
		
		
	}
</script>

<style lang="scss">
	
	.my-settle-container{
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
			.amount{
				padding-left: 40px;
			};
			white-space: nowrap;
		}
		
		.my-settle-right{
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