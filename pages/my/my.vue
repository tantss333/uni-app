<template>
	<view class="user-container">
		<my-login v-if="!token"></my-login>
		<my-user-info v-else></my-user-info>
	</view>
</template>

<script>
	
	import {
		useStore,
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	
	import userBadge from '@/mixins/useBadge.js';
	
	
	export default {
		
		setup() {
			const {
				total,
				checkCount,
				setBadge
			} = userBadge();
			return {
				total,
				checkCount,
				setBadge
			}
		},
		
		computed:{
			...mapState('user',['token','redirectUrl'])
		},
		
		
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	
	page, .user-container{
		height: 100%;
	}
	
	
	

</style>
