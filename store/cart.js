const cart = {

	namespaced: true,

	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	mutations: {
		addToCart(state, goods) {

			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)

			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			};

			this.commit('cart/savetoStorage')

		},


		updateCart(state, goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)

			if (!findResult) {
				return
			} else {
				findResult.goods_state = goods.goods_state
				
			};

			this.commit('cart/savetoStorage')
		},

		
		
		updateGoodsCount(state, goods){
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
			if (!findResult) {
				return
			} else {
				findResult.goods_count = goods.goods_count
			};
			
			this.commit('cart/savetoStorage')
		},
		
		
		updateAllGoodsState(state, newState){
			
			state.cart.forEach(x=>x.goods_state=newState)
			this.commit('cart/savetoStorage')
			
			
		},
		
		
		
		deleteCartGoods(state, goods){
			// console.log(goods)
			state.cart = state.cart.filter((x)=> x.goods_id !== goods.goods_id)
			this.commit('cart/savetoStorage')
		},


		savetoStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		}
	},

	getters: {
		total: (state) => {
			let c = state.cart.reduce((t, l) => t + l.goods_count, 0)
			return c
		},
		
		checkCount:(state) =>{
			let result = state.cart.filter((x)=>x.goods_state).reduce((t, l) => t + l.goods_count, 0)
			return result
			
		},
		
		checkGoodsAmount(state, goods){
			const totalAmount = state.cart.filter(x=> x.goods_state===true).reduce(
			(t, l) => t + l.goods_count*l.goods_price, 0
			).toFixed(2)
			
			console.log(totalAmount)
			return totalAmount
		}

	}
}

export default cart