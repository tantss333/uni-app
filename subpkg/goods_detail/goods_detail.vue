<template>
	<view>
		this is {{goods_id}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_id:''
			}
		},
		methods: {
			
		},
		
		onLoad(e) {
			this.goods_id = e.goods_id
		}
	}
</script>

<style>

</style>
