//user action reducer for action
const userReducer = (state = {
	name:"Hemin",
	token:"",
	id: 1607
},action) =>{
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