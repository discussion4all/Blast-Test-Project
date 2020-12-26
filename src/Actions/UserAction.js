//action for set user name on redux state
export function setName(name){
	return {
		type : "SET_NAME",
		payload : name
	}
}
//action for set access token on redux state
export function setToken(token){
	return {
		type : "SET_TOKEN",
		payload : token
	}
}