import logger from 'redux-logger' 
import { createStore , combineReducers ,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import user  from './Reducers/userReducer'
import questionData  from './Reducers/questionReducer'

const myLogger =(store)=> (next) => (action)=>{
	next(action);
}

export default createStore(combineReducers({
	user,
	questionData
}) ,{} , applyMiddleware(thunk,promise)
 );
