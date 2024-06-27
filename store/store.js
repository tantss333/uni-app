import cart from '/store/cart.js'
import user from '/store/user.js'
import { createStore } from "vuex";



const store = createStore(
{
  modules:{
	  cart,
	  user
  }
  
});


export default store;
