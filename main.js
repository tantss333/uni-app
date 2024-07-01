import {
	$http
} from '@escook/request-miniprogram'

uni.$http = $http

// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	});

	if (options.url.indexOf('/my/') !== -1) {
		options.header.Authorization = store.state.user.token
	}
}

// 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading();
}

//封装弹框的方法
uni.showMsg = function(title = "数据请求失败", duration = 1500) {
	uni.showToast({
		title: title,
		icon: "none",
		duration: duration,
		mask: true
	})
}


// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 引入$http请求对象
// 请求导入即可


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
import store from './store/store.js'
import Vuex from "vuex"


export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	return {
		app
	}
}
// #endif