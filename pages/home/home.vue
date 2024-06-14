<template>
	<view>
		
		<view class="search-box">
			<my-search @myclick="gotoSearch"></my-search>
		</view>
		
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickhandler(item)">
				<image :src="item.image_src" mode="" class="nav-image"></image>
			</view>
			
		</view>
		
		<!-- 楼层区域UI -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i" @click="navClickhandler(item)">
				<image :src="item.floor_title.image_src" mode="" class="floor-title-image"></image>
				
				<!-- 楼层标图片区域-->
				<view class="floor-image-box">
					<navigator class="left-image-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width  + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-image-box">
						
						<navigator class="right-image-item" v-for="(item_, i) in item.product_list.slice(1)" :key="i" :url="item_.url">
							<image :src="item_.image_src" mode="widthFix" :style="{width: item_.image_width + 'rpx'}"></image>
						</navigator>
						
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
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		
		onLoad() {
			this.getSwiperList();
			this.getNavList();
			this.getFloorList()
			
		},
		
		methods:{
			async getSwiperList() {
				const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata');
		
				if (res.meta.status !== 200) {return uni.showMsg()
				} else{
					this.swiperList=res.message
			
					console.log(this.swiperList)
					}
			},
			
			async getNavList() {
				const {data:res} = await uni.$http.get('/api/public/v1/home/catitems');
					
				if (res.meta.status !== 200) {return uni.showMsg()
				} else{
					this.navList=res.message
					// uni.showMsg("加载成功")
					console.log(this.navList)
					}
			},
			
			async getFloorList() {
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata');
					
				if (res.meta.status !== 200) {return uni.showMsg()
				} else{
					
					
					res.message.forEach(floor=>{
						// console.log(floor)
						floor.product_list.forEach(prod =>{
							prod.url = "/subpkg/goods_list/goods_list?" + prod.navigator_url.split("?")[1]
						})
					});
					this.floorList=res.message
					// uni.showMsg("加载成功")
					
					}
			},
			
			
			async navClickhandler(item) {
				
				item.name === "分类" ? uni.switchTab({
					url:"/pages/cate/cate"
				}) : console.log(item.name)
				
				
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
swiper {
	height: 330rpx;
	.swiper-item, image{
		height: 100%;
		width: 100%;
	}
}

.nav-list{
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	
	.nav-item{
		width: 20%;
		height: 140rpx;
		
		.nav-image{
			width: 100%;
			height: 100%
		}
	}
	
	
	
	
}



.floor-title-image {
	width: 100%;
	height: 60rpx;
}


.right-image-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.floor-image-box {
	display: flex;
}

.floor-item {
	// margin: 15px 0;
}

.search-box {
	position: sticky;
	top:0;
	z-index: 999;
	
}


</style>
