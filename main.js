import App from './App'
import Store  from './store/index.js'


// #ifndef VUE3
import Vue from 'vue'
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
// 全局挂载方法
import initial from '@/initial/modules.js'
export function createApp() {
	const app = createSSRApp(App)
	app.use(Store)
	app.use(initial)
	return {
		app
	}
}
// #endif
