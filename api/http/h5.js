import { baseUrl } from '@/global/js/baseUrl.js'

import axios from axios;

// 给所有axios实例配置请求根路径
axios.defaults.baseURL = baseUrl
// 配置请求时限（15s） 
axios.defaults.timeout = 15000;
// 给所有axios实例配置统一的数据返回格式
axios.defaults.transformResponse = [(data) => {
	try {
		return JSON.parse(data).data
	}catch(e) {
		return data.data
	}
}]
// 请求拦截
function addInterceptors(obj, isLoading = true) {
	let loading = true
	obj
		.interceptors
		.request
		.use(config => {
			// 统一对中文字符编码
			config.url = encodeURI(config.url)
			loading = config.loading !== undefined
			? config.loading
			: true
			// uni.setStorageSync('token', token)
			uni.getStorageSync('token')
			&& (config.headers.Authorization = `Bearer ${uni.getStorageSync('token')}`)
			&& (new RegExp(/\/auth\/login/g).test(config.url) || new RegExp(/\/auth\/loginWx/g).test(config.url) || new RegExp(/\/auth\/loginPh/g).test(config.url))
			&& (config.headers.Authorization = "")
			loading && isLoading && uni.showLoading({
			    title: '加载中',
					mask: true
			})
			return config
		}, err => {
			loading && isLoading && uni.hideLoading()
			uni.showToast({
				icon: 'none',
				title: '服务器出错，请联系客服进行处理'
			})
		})
		
	obj
		.interceptors
		.response
		.use(response => {
			loading && isLoading && uni.hideLoading()
			return response
		}, err => {
			loading && isLoading && uni.hideLoading()
			const regexp = new RegExp(/timeout/g)
			typeof err.response === "object" 
			? (err.response.status === 401
				? (uni.showToast({
						icon: 'none',
						title: '请登录'
					}), uni.removeStorageSync('token'), !store.state.login.isLoginPage && 
					(
						uni.reLaunch({
							url: '/pages/login/index'
						}),
						store.commit("SET_LOGIN_STATUS", true)
					))
			  : err.response.status === 403
			  ? uni.showToast({
					icon: "none",
					title: '无权限,请联系客服开放权限'
				})
			  :err.response.status === 500
			  ? uni.showToast({
					icon: "none",
					title: '服务器出错,请联系客服进行处理'
				})
			  : uni.showToast({
					icon: "none",
					title: JSON.parse(err.response.request.response).message
					? JSON.parse(err.response.request.response).message.replace(/\{[^\{]*\}/g, '')
					: JSON.parse(err.response.request.response)
				}))
			: (regexp.test(err)
				? uni.showToast({
					icon: "none",
					title: '请求超时，请检查网络是否连通'
				})
				: uni.showToast({
					icon: "none",
					title: '服务器出错，请联系客服进行处理'
				}))
			return Promise.reject(err)
		})
}

const http_normal = axios.create({
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	transformRequest: [(data) => {
		let str = ""
		for(let key in data) {
			str += `${key}=${data[key]}&`
		}
		return str.replace(/&$/, '')
	}]
})

const http_json = axios.create({
	headers: {
		"Content-Type": "application/json"
	},
	transformRequest: [(data) => {
		return JSON.stringify(data)
	}]
})

const http_file = axios.create({
	headers: {
		"Content-Type": "multipart/form-data"
	},
	transformRequest: [(data) => {
		const formData = new FormData()
		for(let key in data) {
			formData.append(key, data[key])
		}
		return formData
	}]
})

const http = axios.create({
	headers: {
		"Content-Type": "application/json"
	},
	transformRequest: [(data) => {
		return JSON.stringify(data)
	}]
})

addInterceptors(http_normal)
addInterceptors(http_json)
addInterceptors(http_file)
addInterceptors(http, false)

export default {
	http_normal,
	http_json,
	http_file,
	http
}