export function setAllQuestion(allQuestion){
	return {
		type : "SET_ALL_QUESTION",
		payload : allQuestion
	}
}

export function setOneQuestion(oneQuestion){
	return {
		type : "SET_ONE_QUESTION",
		payload : oneQuestion
	}
}

export function setquizType(type){
	return {
		type : "SET_QUIZ_TYPE",
		payload : type
	}
}

export function setAllAnswers(answers){
	return {
		type : "SET_ALL_ANSWER",
		payload : answers
	}
}
