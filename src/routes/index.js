import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}admin/dashboard`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route path={`${match.url}startexam`} component={asyncComponent(() => import('./User/StartExam'))}/>
      <Route path={`${match.url}Question/:session`} component={asyncComponent(() => import('./User/Question'))}/>
    </Switch>
  </div>
);

export default App;
