import React,{useState,useEffect, useRef} from "react";
import {Button,Radio,Divider,Space,Input,Form} from "antd";
import {useDispatch, useSelector} from "react-redux";

import IntlMessages from "../../../util/IntlMessages";
import {getQuestionSet} from "../../../appRedux/actions/User/Question";

import { Link } from "react-router-dom";
import {  useHistory, useParams } from "react-router-dom";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 10 },
};
const QuestionPage = () => {
  	const History =  useHistory();
  	const dispatch = useDispatch();
  	const question = useSelector(({question}) => question);
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
	const [form] = Form.useForm();
	useEffect(() => {
	    dispatch(getQuestionSet({"setnumber" : datasetNumber}));
	});
	const changeExamType = async(e)=>{
		//props.dataprops.setquizType(e.target.value)
		//setQuestion(props.dataprops.questionData.allQuestion.Questions,e.target.value);
		setShowQuestion(true)
		setShowOptions(false);
	}
	function onChange(e) {
	  console.log(`radio checked:${e.target.value}`);
	}
	const checkAnswer = async()=>{

	}
	const next_Question = async()=>{
		
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
				       	
				       				            
						<Form {...layout} form={form} name="control-hooks" >
						  	{ showOptions && (
								<Form.Item {...tailLayout}>
								    <Radio.Group onChange={(e)=>changeExamType(e)} defaultValue="a">
								      <Radio.Button value="easytohard">Easy to Hard</Radio.Button>
								      <Radio.Button value="hardtoeasy">Hard to Easy</Radio.Button>
								    </Radio.Group>
								</Form.Item>
								)
				            }
				           	{showQuestion &&(
				           	    <div>
							      <Form.Item name="note" label="Question" >
							        <label>test</label>
							      </Form.Item>
							      <Form.Item name="gender" label="Answer" >
							        <Input />
							      </Form.Item>
							        {isHint &&
								      <Form.Item name="note" label="Hint" >
								        <label>test</label>
								      </Form.Item>
								    }
								    {isExplaination && 
								    	<Form.Item name="gender" label="Explaination" >
									        <Input />
									    </Form.Item>	
								    }
							      { !answerAction &&(
								    <Form.Item >
								        <Button type="primary" htmlType="button" onClick={()=>setIsHint(true)}>
								          Hint
								        </Button>
								        <Button htmlType="button" onClick={()=>checkAnswer()} >
								          Submit
								        </Button>
							      	</Form.Item>)
							      }
							      { answerAction &&(
							      	<div>
								       	<Form.Item name="note" label="Correct Answer" >
								       	    <label>test</label>
								      	</Form.Item>
								       	<Form.Item name="note" label="Your Answer" >
								        	<label>test</label>
								      	</Form.Item>
								      	<Form.Item >
									        <Button type="primary" htmlType="button" onClick={()=>setIsExplaination(true)}>
									          Explaination
									        </Button>
									        <Button htmlType="button" onClick={()=>next_Question()} >
									          Next
									        </Button>
									    </Form.Item>
									</div>
								   )}
							    </div>
						     )}
					    </Form>
				      </div>
				    </div>
			    </div>
		    </div>
	    </div>
	);
};

export default QuestionPage;
