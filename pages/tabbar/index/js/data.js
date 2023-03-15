// 保存变量
import {ref,reactive, toRefs, computed, watch} from 'vue'
// import {useStore} from 'vuex' useStore不能在setup之外执行
// const store = useStore()

// 直接引入store
import store from '@/store'
export default function data(){
	var info = reactive({
		num:0
	})
	
	var count = ref(0)
	// var refData = toRefs(data)
	// console.log(refData.num)
	return {
		info,
		count,
		store,
	}
}