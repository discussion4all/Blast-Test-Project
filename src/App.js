import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import routes from "./routes/routes";

import './App.css';
import "./style/css/style.css";


function App() {
  return (
    <div>
        <Router>
          <div>
            <Switch>
              {
                routes.map(({path,Component},index)=>{
                    return (
                      <Route exact path={path} key={index}>
                        <Component/>
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

export default App;
