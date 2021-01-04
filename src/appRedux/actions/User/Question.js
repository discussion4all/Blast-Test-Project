import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  QUESTION_SET,
  QUESTION_ONE,
  SET_ALL_QUESTION,
  SET_ONE_QUESTION,
  SET_QUIZ_TYPE,
  SET_ALL_ANSWER
} from "../../../constants/ActionTypes";
import axios from 'util/Api'


export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};
export const getQuestionSet = ({setnumber}) => {
  
  return (dispatch) => {
    dispatch({type: FETCH_START});
    console.log("localStorage.getItem('token')", localStorage.getItem("token"))
    var token  = "Bearer " +JSON.parse(localStorage.getItem("token"))
    axios.defaults.headers.common['authorization'] = token
    axios.post('question/getOneQuestionSet', {
        "set": setnumber
      }
    ).then(({data}) => {
      
      if (data.result) {
        // localStorage.setItem("token", JSON.stringify(data.token.access_token));
        // axios.defaults.headers.common['authorization'] = "Bearer " + data.token.access_token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SET_ALL_QUESTION, payload: data});
      } else {
        
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
}