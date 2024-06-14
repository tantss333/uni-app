<template>
	<view class="my-search-container" :style="{'backgroundColor':bgColor}" @click="searchBoxHandler">
		<view class="my-search-box" :style="{'border-radius':radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		
		props:{
			bgColor:{
				type:String,
				default:'C00000'
				
			},
			radius:{
				type:Number,
				default:18
			}
		},
		
		methods:{
			searchBoxHandler(){
				this.$emit('myclick')
			}
		}
	}
</script>

<style lang="scss">
	
	.my-search-container{
		height: 50px;
		background-color: #C00000;
		display: flex;
		align-items: center;
		padding: 0 10px;
		
		.my-search-box{
			width: 100%;
			height: 36px;
			border-radius: 18px;
			background-color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			// box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.3);
			
			.placeholder{
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}

</style>