import {
	ref,
	computed,
	toRefs
} from 'vue'
import store from '@/store'
import data from './data.js'
var {
	info,count
} = data();
const useData = () => {
	const doubles = computed(() => {
		return count.value * 2 || 0
	})
	const increment = () => {
		info.num++;
		count.value++;
		
		// 修改vuex中username
		store.commit('SET_USERNAME','李辉')
	}
	const refData = toRefs(info)
	return {
		...refData,
		count,
		doubles,
		increment
	}
}
export default useData
