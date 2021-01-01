import React,{useState,useEffect, useRef} from "react";
import {Button,Radio,Divider,Space} from "antd";

import IntlMessages from "../../../util/IntlMessages";
import { Link } from "react-router-dom";
import {  useHistory, useParams } from "react-router-dom";


const QuestionPage = () => {
  	const History =  useHistory();
  	const [startloader, setStartloader] = useState(false);
	const [answerAction,setAnswerAction] = useState(false);
	const [isHint,setIsHint]= useState(false);
	const [isExplaination,setIsExplaination]= useState(false);
	const [datasetNumber,setDatasetNumber] = useState(1);
	const [questionNumber,setQuestionNumber] = useState(0);
	const [showQuestion,setShowQuestion]  = useState(false);
	const [userAnswer,setUserAnswer] = useState("");
	const [check_Answer,setCheck_Answer]= useState("");


	const [correctPracticeAnswer,setCorrectPracticeAnswer] = useState({});
	const [practicePass,setPracticePass] = useState("");
	const [showAudio,setShowAudio] = useState(false);
	const [showPracticeResult,setShowPracticeResult] = useState(false);
	const [showOptions,setShowOptions] = useState(true);
	const [lblheading,setLblheading] = useState("");

	const player = useRef();

	var {session} = useParams();
	const changeExamType = async(e)=>{
		//props.dataprops.setquizType(e.target.value)
		//setQuestion(props.dataprops.questionData.allQuestion.Questions,e.target.value);
		setShowQuestion(true)
		setShowOptions(false);
	}
	function onChange(e) {
	  console.log(`radio checked:${e.target.value}`);
	}
	return (
	    <div>
		    <div className="gx-app-login-wrap">
			    <div className="gx-app-login-container">
			    	<div className={`gx-card`}>
				      <div className="gx-card-head">
				        <h3 className="gx-card-title"></h3>
				      </div>
				      <div className={`gx-card-body`}>
				      <Divider>{session}</Divider>
				       	
				       	{ showOptions && (
							<>
							    <Radio.Group onChange={(e)=>changeExamType(e)} defaultValue="a">
							      <Radio.Button value="easytohard">Easy to Hard</Radio.Button>
							      <Radio.Button value="hardtoeasy">Hard to Easy</Radio.Button>
							    </Radio.Group>
							</>
							)
			            }

				      </div>
				    </div>
			    </div>
		    </div>
	    </div>
	);
};

export default QuestionPage;
