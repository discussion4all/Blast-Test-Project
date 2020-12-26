import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from "./routes/routes";
import {connect,Provider} from 'react-redux'
import './App.css';
import "./style/css/style.css";
import {setToken,setName} from './actions/userAction'
import {setInitialState,setAllQuestion,setOneQuestion,setquizType,setAllAnswers} from './actions/questionAction'


function App(props) {

  return (
    <div>
        <Router>
          <div>
            <Switch>
              {
                routes.map(({path,Component},index)=>{
                    return (
                      <Route exact path={path} key={index}>
                        <Component dataprops={props} />
                      </Route>
                    )
                })
              }
            </Switch>
          </div>
        </Router>
    </div>
  );
}

//state for the appliction
const mapStateToProps = (state) =>{
  return {
    user : state.user,
    questionData : state.questionData
  }
}

//dispatch all method for application
const mapDispatchToProps = (dispatch) =>{
  return {
    setInitialState:(initialState) =>{
      dispatch(setInitialState(initialState))
    },
    setToken: (token) =>{
      dispatch(setToken(token))
    },setName:(name)=>{
      dispatch(setName(name))
    },setquizType:(type)=>{
       dispatch(setquizType(type))
    },setAllQuestion:(allQuestion)=>{
      dispatch(setAllQuestion(allQuestion))
    },setOneQuestion:(oneQuestion)=>{
      dispatch(setOneQuestion(oneQuestion))
    },setAllAnswers :(answers)=>{
      dispatch(setAllAnswers(answers))
    }
  }
}
 


export default connect(mapStateToProps,mapDispatchToProps)(App)

