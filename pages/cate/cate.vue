<template>
	<view>
		
		<view class="">
			<!-- 使用自定义的搜索组件 -->
			<my-search @myclick="gotoSearch()"></my-search>
		</view>
		<view class="scroll-view-container">
			<!-- 左侧滑动区 -->
			<scroll-view scroll-y="true" :style="{height: wh +'px'}" class="left-scroll-view" >
				<view :class="['left-scroll-view-item', index===active? 'active':'']" v-for="(item, index) in cateList" :key="index" @click="activeChanged(index)">{{item.cat_name}}</view>
			</scroll-view>
			
			<!-- 右侧滑动区 -->
			<scroll-view scroll-y="true" :style="{height: wh +'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,index2) in cateList2" :key="index2">
					<view class="cate-lv2-title">{{item2.cat_name}}</view>
					
					<view class="cate-lv2-item-list">
						<view class="cate-lv2-item" v-for="(item3, index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon" mode=""></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>				
				
			</scroll-view>
			
		</view>
		
	</view>
</template>

<script>
	
	import useBadge from '@/mixins/useBadge.js'
	
	export default {
		
		setup(){
			const {total,
				checkCount,
				setBadge,updateBadge} = useBadge()
			return {total,
				checkCount,
				setBadge,updateBadge}
		},
		
		data() {
			return {
				wh:0,
				cateList:[],
				cateList2:[],
				cateList3:[],
				active:0,
				scrollTop:0
			};
		},
		
		onShow() {
			this.setBadge()
		},
		
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
			this.getCateList()
		
		},
		
		methods:{
			
			getNumber(number){
				
				var numberList = []
				for (var i=0; i<number;i++){
					numberList[numberList.length] = i
				};
				return numberList
			},
			
			
			async getCateList() {
				const {data:res} = await uni.$http.get('/api/public/v1/categories');
					
				if (res.meta.status !== 200) {return uni.showMsg()
				} else{
	
					this.cateList=res.message
					this.cateList2 = res.message[0].children
					this.cateList3 = this.cateList2[0].children
					
					}
			},
			
			activeChanged(index) {
				this.active = index;
				this.cateList2 = this.cateList[index].children;
				this.scrollTop = this.scrollTop===0? 1:0
			},
			
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container {
	display: flex;
	.left-scroll-view{
			width: 120px;
		}
	
	.left-scroll-view-item{
		background-color: #F7F7F7;
		line-height: 60px;
		justify-content: center;
		text-align: center;
		
		&.active{ 
			background-color: white;
			position: relative;
			
			&::before{
				content: ' ';
				display: block;
				width: 3px;
				height: 30px;
				background-color: red;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
			
		}
	}
	
}

.cate-lv2-title{
	font-size: 12px;
	font-weight: bold;
	text-align: center;
	padding: 15px 0;
}

.cate-lv2-item-list{
	display: flex;
	// justify-content: space-around;
	flex-wrap: wrap;
	
}
.cate-lv2-item{
	width: 33.33%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
	
	
	image{
		width: 60px;
		height: 60px;
	}
	
	text{
		font-size: 12px;
	}
}




</style>
