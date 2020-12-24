const userReducer = (state = {
	name:"Hemin",
	token:""
},action) =>{
	console.log(action.type,action.payload)
	switch(action.type){
		case "SET_NAME_FULFILLED":
			state={
				...state,
				name : action.payload
			}
			break;
		case "SET_TOKEN":
			state={
				...state,
				token : action.payload
			}
			break;
	}
	return state;
}

export default userReducer