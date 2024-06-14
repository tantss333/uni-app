<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="please input"></uni-search-bar>
			
		</view>
		
		<view class="searchList" v-if="searchResults.length !==0">
			
			<view class="search-item" v-for="(item,index) in searchResults" :key="index" @click="gotoGoodsDetail(item.goods_id)">
				<view class="search-item-title">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<view class="history-container" v-else>
			
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20" @click="deleteHistory"></uni-icons>
			</view>
			
			
			<view class="history-list">
				<uni-tag class="tag" :text="item" v-for="(item , index) in histories" :key="index" @click="gotoGoodsList(item)")></uni-tag>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:'',
				searchResults:[],
				historyResults:['a','b','c']
			};
		},
		
		onLoad() {
			this.getHistoryResults()
		},
		
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.kw = e
					this.getSearchList()
				}, 300)
				
			},
			
			getHistoryResults(){
				const result = uni.getStorageSync('historyResults')
				this.historyResults = result
				console.log(this.historyResults)
			},
			
			async getSearchList() {
				
				
				if (this.kw.length === 0){
					this.searchResults=[]
					return
				} else {
				
			
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
			
				if (res.meta.status !== 200) {return uni.showMsg()
				} else{
					this.searchResults = res.message
					
					this.saveHistory()
					}
				}
				
			},
			
			gotoGoodsDetail(goods_id){
				console.log(goods_id)
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			
			gotoGoodsList(goods_name){
			
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + goods_name
				})
			},
			
			saveHistory(){
				
				const set = new Set(this.historyResults)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyResults = Array.from(set)
				uni.setStorageSync("historyResults", this.historyResults)
								
			}, 
			
			deleteHistory(){
				this.historyResults = []
				uni.setStorageSync('historyResults',[])
			}
			
			
			
		},
		
		
		computed: {
			histories(){
				return [...this.historyResults].reverse()
			}
		}
	}
</script>

<style lang="scss">
	
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999
	}
	
	.search-item {
		display: flex;
		padding: 0 5px;
		align-items: center;
		justify-content: space-between;
		
		.search-item-title{
			font-size: 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
			padding: 13px 0;
			border-bottom: 1px solid red;
		}
	}
	
	.history-container {
		
		padding: 0 5px;
	
		.history-title {
			display: flex;
			justify-content: space-between;
			padding: 5px 10px;
			border-bottom: 1px solid black;
			align-items: center;
			height: 40rpx;
			font-size: 13px;
		}
		
		.history-list {
			display: flex;
			flex-wrap: wrap;
		}
		
		.tag {
			padding: 5px 10px;
		}
	
	}

</style>
