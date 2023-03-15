// #ifdef H5
// import h5 from '@/api/http/h5.js'
// #endif
// #ifndef H5
import wx from '@/api/http/wx.js'
// #endif

// 引入navigate
import Navigate from '@/api/navigate/index'


export default{
	install:(app)=>{
		
		// 封装跳转挂载
		app.config.globalProperties.$navigateTo = Navigate.navigateTo
		app.config.globalProperties.$navigateBack = Navigate.navigateBack
		app.config.globalProperties.$switchTab = Navigate.switchTab
		app.config.globalProperties.$redirectTo = Navigate.redirectTo
		app.config.globalProperties.$reLaunch = Navigate.reLaunch
		
	}
}