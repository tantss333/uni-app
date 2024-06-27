import {
	onMounted,
	ref,
	computed,
	watch
} from 'vue';
import {
	useStore,
	mapState,
	mapMutations,
	mapGetters
} from 'vuex';

// 按照惯例，组合式函数名以“use”开头


export default function() {
	// 接收鼠标位置
	
	const $store = useStore();
	const total = computed(() => $store.getters['cart/total']);
	const checkCount = computed(() => $store.getters['cart/checkCount']);


	function setBadge() {

		if (this.total === 0) {
			uni.removeTabBarBadge({
				index: 2
			})
		} else {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}

	}
	
	
	function updateBadge() {
	
		if (this.checkCount === 0) {
			uni.removeTabBarBadge({
				index: 2
			})
		} else {
			uni.setTabBarBadge({
				index: 2,
				text: this.checkCount + ''
			})
		}
	
	}


	return {
		total,
		checkCount,
		setBadge,
		updateBadge
	}
}