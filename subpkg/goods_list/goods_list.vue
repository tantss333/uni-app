<template>
	<view>
		{{query}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				query:""
			};
		},
		
		
		onLoad(event) {
			
			this.query = event.cid
			console.log(event)
		}
	}
</script>

<style lang="scss">

</style>
