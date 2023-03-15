// 保存变量
import {ref,reactive, toRefs} from 'vue'
export default function data(){
	var info = reactive({
		num:0
	})
	var count = ref(0)
	// var refData = toRefs(data)
	// console.log(refData.num)
	return {
		info,
		count
	}
}