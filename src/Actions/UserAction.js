export function setName(name){
	return {
		type : "SET_NAME",
		payload : name
	}
}

export function setToken(token){
	return {
		type : "SET_TOKEN",
		payload : token
	}
}