//question, answer action reducer for action

const questionReducer = (state = {
	allQuestion : [],
	oneQuestion : {},
	quizType : "",
	answers : []
},action) =>{

	switch(action.type){
		case "SET_ALL_QUESTION":
			state={
				...state,
				allQuestion : action.payload
			}
			break;
		case "SET_ONE_QUESTION":
			state={
				...state,
				oneQuestion : action.payload
			}
			break;
		case "SET_QUIZ_TYPE":
			state={
				...state,
				quizType : action.payload
			}
			break;
		case "SET_ALL_ANSWER":
			state={
				...state,
				answers : action.payload
			}
	}
	return state;
}

export default questionReducer