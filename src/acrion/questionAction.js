//action for set question on redux state
export function setAllQuestion(allQuestion){
	return {
		type : "SET_ALL_QUESTION",
		payload : allQuestion
	}
}
//action for set one question on redux state
export function setOneQuestion(oneQuestion){
	return {
		type : "SET_ONE_QUESTION",
		payload : oneQuestion
	}
}
//action for set quiz type on redux state
export function setquizType(type){
	return {
		type : "SET_QUIZ_TYPE",
		payload : type
	}
}
//action for set answer on redux state
export function setAllAnswers(answers){
	return {
		type : "SET_ALL_ANSWER",
		payload : answers
	}
}
