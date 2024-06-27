<template>
	<view>
		<view class="goods-list">

			<view class="" v-for="(goods, index) in goodsList" :key="index" @click="gotoGoodsDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {

				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},

				goodsList: [],
				total: 0,
				default_img: '/static/uni.png',
				isLoading: false
			};
		},




		onLoad(options) {

			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},

		onReachBottom() {

			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
				return uni.showMsg('无更多数据')
			}

			if (this.isLoading) {
				return
			} else {
				this.queryObj.pagenum += 1;
				this.getGoodsList()
			}


		},

		onPullDownRefresh() {
			this.queryObj.pagenum = 1,
				this.queryObj.total = 0,
				this.isLoading = false,
				this.goodsList = [];

			this.getGoodsList(() => {
				uni.stopPullDownRefresh()
			})
		},




		methods: {
			async getGoodsList(cb) {

				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)


				cb && cb()
				if (res.meta.status !== 200) {
					return uni.showMsg()
				} else {

					this.goodsList = [...this.goodsList, ...res.message.goods]
					this.total = res.message.total
					this.isLoading = false
				};



			},

			gotoGoodsDetail(goods) {

				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})

			}

		}
	}
</script>

<style lang="scss">
	
</style>