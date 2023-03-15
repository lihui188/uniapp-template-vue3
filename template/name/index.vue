<template>
	<view> 你好 </view>
</template>
<script setup>
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	// 计算属性与监听属性是在vue中而非uniap中 需要注意！！！
	import {
		watch,
		computed
	}
	from "vue";
	onLoad((options) => {
		console.log('页面初始化')
	});
	onShow(() => {
		console.log('页面出现时')
	});
	// 其他方法也是一样，监听页面滚动,上拉加载 下拉刷新 等等都是一样的使用方式
	// 监听事件与计算属性与生命周期略有不同 
	// 这里我们假设计算一个名为name的变量 这是vue3中的写法 如果有多个计算方法 ，那么我们只需要将这个方法复制一个即可
	const name = ref('默认值');
	const name2 = ref('默认值2')
	const name = computed(() => {
		let style = ""
		// do something
		// 当这个方法内的所有用到的值发生改变时 都会重新执行并计算
		return style;
	})
	const name2 = computed(() => {
		let style = ""
		// do something
		return style;
	})
	// 相当于vue2 中写法是：
	//	computed: {
	//		name () {
	//		let style = ""
	//		// do something
	//		return style ;
	//	}
	//}
	//  假设监听 一个 name 变量
	watch(name, (newValue, oldValue) => {
		// do something 
		// 这里就是当 name 属性值发生变化时 ，就会执行此方法
	})
	// 如果需要监听多个变量，且要做的事情是一样的 那么我们只需要把第一个参数变为数组即可
	watch([name, name2], (newValue, oldValue) => {
		// do something 
		// 这里就是当 name或者name2 值发生变化时 ，就会执行此方法
	})
	
	
	// 对vuex中数据进行监听
	// const username = computed(()=>{
	// 	return store.state.user.username
	// })
	// watch(username, (newValue, oldValue) => {
	// 	console.log(newValue)
	// })
</script>
<style>
</style>
