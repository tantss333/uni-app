const user = {

	namespaced: true,

	// 数据节点
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),


	//方法节点
	mutations: {
		//更新收货地址
		updateAddress(state, address) {

			state.address = address

			this.commit('user/savetoAddress')
		},

		savetoAddress(state) {

			uni.setStorageSync('address', JSON.stringify(state.address))
			console.log('地址存储本地成功')
		}
	},

	//对象节点
	getters: {
		addStr(state) {
			if (!state.address.provinceName) return ''

			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}
}

export default user