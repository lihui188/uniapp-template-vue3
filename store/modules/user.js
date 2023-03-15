const user = {
	state:{
		username:'ahuis'
	},
	mutations: {
		// 
		// 设置菜单
		SET_USER(state, obj) {
			console.log(state.username)
		},
		SET_USERNAME(state,params){
			console.log(params,'params')
			state.username = params
		}
	},
	actions:{
		
	},
	getters:{
		
	},
}
export default user;
