import React from "react";
import {Button} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import { Link } from "react-router-dom";


const StartExamPage = () => {
  return (
    <div>
	    <div className="gx-app-login-wrap">
		    <div className="gx-app-login-container">
		    	<div className={`gx-card`}>
			      <div className="gx-card-head">
			        <h3 className="gx-card-title"></h3>
			      </div>
			      <div className={`gx-card-body`}>
			       	<h1>Welcome to quiz portal</h1>
			       	<Link to={`/question/studySession`}>
			       		<Button type="primary"><IntlMessages id="tmp.StudySession" defaultMessage="Study Session"/></Button>
			       	</Link>
			       	<Link to={`/question/quizSession`}>
			       		<Button type="primary"><IntlMessages id="tmp.QuizSession" defaultMessage="Quiz Session"/></Button>
			       	</Link>
			      </div>
			    </div>
		    </div>
	    </div>
    </div>
  );
};

export default StartExamPage;
