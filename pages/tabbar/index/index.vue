<template>
	<view class="home"> 
	你好
	 <span class="world" @click="increment">跳转</span>
	 <span style="margin-right:10upx;">{{count}}</span>
	 <span>{{doubles}}</span>
	 <span>num:{{num}}</span>
	 </view>
</template>
<script setup>
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	import useData from './js/useGetData.js'
	const {num,count,doubles,increment} = useData()
	onLoad((options) => {
		console.log('页面初始化')
	});
	onShow(() => {
		console.log('页面出现时')
	});
	
</script>
<style lang="scss" src="./scss/index.scss">
</style>
