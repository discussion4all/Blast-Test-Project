import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from "./routes/routes";
import {connect,Provider} from 'react-redux'
import './App.css';
import "./style/css/style.css";
import {setToken,setName} from './Actions/UserAction'
import {setAllQuestion,setOneQuestion,setquizType} from './Actions/QuestionAction'


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

const mapStateToProps = (state) =>{
  return {
    user : state.user,
    questionData : state.questionData
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
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
    }
  }
}
 


export default connect(mapStateToProps,mapDispatchToProps)(App)

