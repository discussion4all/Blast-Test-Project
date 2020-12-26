import logger from 'redux-logger' 
import { createStore , combineReducers ,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import user  from './reducers/userReducer'
import questionData  from './reducers/questionReducer'

//logger for devlopment only
const myLogger =(store)=> (next) => (action)=>{
	next(action);
}
// store  for reduser
export default createStore(combineReducers({
	user,
	questionData
}) ,{} , applyMiddleware(thunk,promise)
 );
