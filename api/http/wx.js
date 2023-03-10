import axios from 'axios'
import {url} from './url.js'
// import router from '../src/router/index'
// axios.defaults.baseURL = 'http://192.168.2.247:8080/api/v1'
axios.defaults.baseURL = url
// 1.白名单
	const whiteList = [
		"/pages/index/index", 
		"/pages/category/category", 
		"/pages/user/user", 
		"/pages/search/search", 
		"/pages/user/register/password",
		"component/user/phoneCode",
		"/pages/user/login/login",
		"/pages/user/register/register",
		"/component/common/detail/detail",
		"/"
		]

// 适配axios
axios.defaults.adapter = function(config) {
  return new Promise((resolve, reject) => {
      var settle = require('axios/lib/core/settle');
      var buildURL = require('axios/lib/helpers/buildURL');
      uni.request({
          method: config.method.toUpperCase(),
          url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
          header: config.headers,
          data: config.data,
          dataType: config.dataType,
          responseType: config.responseType,
          sslVerify: config.sslVerify,
          complete: function complete(response) {
              response = {
                  data: response.data,
                  status: response.statusCode,
                  errMsg: response.errMsg,
                  header: response.header,
                  config: config
              };

              settle(resolve, reject, response);
          }
      })
  })
}
export function request (url, method) {
  const instance = axios.create({
    url,
    method: method || 'get'
  })

  // 2.请求拦截器(发送网络请求时是否允许携带某些参数)
  instance.interceptors.request.use(config => {
	  // 设置超时时间不能为5分钟
	  // if(config.timeout>=5000000){
		 //  return uni.showToast({
		 //  	title: '请求超时',
			// icon: 'error'
		 //  })
	  // }
	  const url = config.url
    // 2.2 判断有无token
    	const token = uni.getStorageSync('token')
	// 2.2.1 如果token为真，而且路径不包含notAuth的情况下，添加头部token
    if (token && url.indexOf("notAuth") === -1) {
      config.headers[token.tokenName] = `Bearer ${token.tokenValue}`
      return config
    }
	// 2.3 每次发送请求之前，都需要展示一个加载框
	    uni.showLoading({
	        title: "正在加载...",
	        mask: true,
	        success: (result) => {},
	        fail: () => {},
	        complete: () => {}
	    });
	return config
  }, (err) => {
    console.log('configerr', err)
  })

  // 3.响应拦截器(是否阻止当请求成功后返回的数据)
  instance.interceptors.response.use(res => {
	  console.log(res);
    const errcode = res.data.code
    switch (errcode) {
      case 401:
		uni.removeStorageSync('token')
		uni.removeStorageSync('phone')
        uni.$u.route({
			url: "pages/user/login/login",
			type: "navigateTo"
		})
		setTimeout(()=>{
			uni.showToast({
				title: '登陆过期！',
				icon: 'error',
				duration: 2000
			}, 1000)
		})

		setTimeout(()=>{
			uni.hideToast()
		}, 2000)
        break;
    }
	uni.hideLoading()
    return res
  }, (err) => {
    console.log('reserr', err)
	if (err.message == 'Network Error') {
	        uni.showToast({
	        	title: '网络错误！',
	        	icon: 'error'
	        })
	 
	    }
	 
	    if (err.message == 'timeout of 10000ms exceeded') {
			uni.showToast({
				title: '网络连接超时！',
				icon: 'error'
			})
	    }
  })

  return instance
}
