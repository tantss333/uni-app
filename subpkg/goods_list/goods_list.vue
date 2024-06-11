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
			
			this.query = event.query
		}
	}
</script>

<style lang="scss">

</style>
