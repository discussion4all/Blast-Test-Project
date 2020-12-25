import React,{useState,useEffect} from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import PreLoading from "../common/preloading";
import ApiServiceCall from "../../services/api";
import {  useHistory } from "react-router-dom";
const Dashboard = (props) => {
	console.log("props",props)
	const History =  useHistory();
	if (localStorage.getItem("token") === null) {
	    History.push("/");
	}
	const [startloader, setStartloader] = useState(false);
	const [answerAction,setAnswerAction] = useState(false);
	const [isHint,setIsHint]= useState(false);
	const [isExplaination,setIsExplaination]= useState(false);
	const [datasetNumber,setDatasetNumber] = useState(1);
	const [questionNumber,setQuestionNumber] = useState(0);
	const [showQuestion,setShowQuestion]  = useState(false);
	const [userAnswer,setUserAnswer] = useState("");
	const [check_Answer,setCheck_Answer]= useState("");
	useEffect(() => {
	   getQuestionData(datasetNumber);
	}, []);
	const getQuestionData = async (dataset)=>{
		var value = {"set":dataset};
		setStartloader(true)
		var getdata = await ApiServiceCall.getOneQuestionSet(value);
		if(getdata.data.err === null){
			if(getdata.data.data.length > 0){
				props.dataprops.setAllQuestion(getdata.data.data[0])
				setQuestion(getdata.data.data[0].Questions,props.dataprops.questionData.quizType)
				setStartloader(false);
			}else{
				History.push("/audio");
			}
		}else{
			console.log("Somthing wrong")
		}
	}
	const setQuestion = async (qdataset,type)=>{
		if(type === "hardtoeasy"){
			const b = qdataset.find((item) => item.Type === 'Hard')
			props.dataprops.setOneQuestion(b)
		}else if(type === "easytohard"){
			if(questionNumber + 1 >= props.dataprops.questionData.allQuestion.Questions.length){
				props.dataprops.setOneQuestion(qdataset[0])
			}else{
				props.dataprops.setOneQuestion(qdataset[questionNumber])
			}
			
		}
	}
	const changeExamType = async(e)=>{
		props.dataprops.setquizType(e.target.value)
		setQuestion(props.dataprops.questionData.allQuestion.Questions,e.target.value);
		setShowQuestion(true)
	}
	const checkAnswer = async()=>{
		setAnswerAction(true);

		if(props.dataprops.questionData.oneQuestion.Answer.replace(/\s+/g,' ').trim().toLowerCase() === userAnswer.replace(/\s+/g,' ').trim().toLowerCase()){
			setCheck_Answer(true)
		}else{
			setCheck_Answer(false)
		}
	}
	const next_Question = async()=>{
		var {quizType,allQuestion } = props.dataprops.questionData;
		setIsExplaination(false)
		
		setAnswerAction(false)
		setIsHint(false)
		if(quizType === "easytohard"){
			setCheck_Answer("")
			if(questionNumber + 1 >= allQuestion.Questions.length){
				setQuestionNumber(0)
				getQuestionData(datasetNumber+1);
				setDatasetNumber(datasetNumber+1)
			}else{
				props.dataprops.setOneQuestion(allQuestion.Questions[questionNumber+1])
				setQuestionNumber(questionNumber+1)
			}
		}else if(quizType === "hardtoeasy"){
			if(check_Answer){
				setDatasetNumber(datasetNumber+1)
				getQuestionData(datasetNumber+1);
			}else{
				if(questionNumber + 1 >= props.dataprops.questionData.allQuestion.Questions.length){
					setQuestionNumber(0)
					getQuestionData(datasetNumber+1);
					setDatasetNumber(datasetNumber+1)
				}else{
					setQuestionNumber(questionNumber + 1)
					props.dataprops.setOneQuestion(allQuestion.Questions[questionNumber])
				}
			}
		}
	}
	
    return(
        <>
        	{startloader && <PreLoading/>}
            <Header/>
            	<div className="container">
            		<div className="_vertical-center">
            			<div className="main-div">
            				{props.dataprops.questionData.allQuestion.length !== 0 && (
								<form >
									{ !showQuestion && (
									  	<div className="more-select" onChange={(e)=>changeExamType(e)}>
							            	<div className="input-box-web">
							            		<input type="radio" value="easytohard" name="examtype" /> <span >Easy to Hard</span >
									        </div>
								            <div className="input-box-web">
								              <input type="radio" value="hardtoeasy" name="examtype"/><span >Hard to Easy</span >
									        </div>
						            	</div>)
						            }
					            	{showQuestion &&(
						            	<>
										  	<div className="cut-box">
										    	<label htmlFor="fname">Question :-  </label><span >{props.dataprops.questionData.oneQuestion.Question}</span >
										    </div>
										    <div className="cut-box">
											    <label htmlFor="lname">Answer</label>
											    <input className="text-box-cust" onChange={(e) => setUserAnswer(e.target.value)} type="text" id="answer" name="lastname" placeholder="Your answer"/>
											    {isHint && <><label htmlFor="fname">Hint :-  </label><span >{props.dataprops.questionData.oneQuestion.Hint}</span ></> }
											    
											    <br/>
											    {isExplaination && <><label htmlFor="fname">Explaination :-  </label><span >{props.dataprops.questionData.oneQuestion.Explanation}</span ></> }
											</div>
											{ !answerAction &&(
											    <div className="more-select">
									            	<div className="input-box-web">
									            		<input type="button" className="submit-btn" onClick={()=>setIsHint(true)} value="Hint"/>
											        </div>
										            <div className="input-box-web"> 
										              <input type="button" className="submit-btn" onClick={()=>checkAnswer()} value="Submit"/>
											        </div>
								            	</div>
								            )}
							            	{answerAction && 
							            		<>
								            	<div className="more-select">
									            	<div className="input-box-web">
									            		<label htmlFor="fname">Correct Answer :-  </label><span >{props.dataprops.questionData.oneQuestion.Answer}</span >
									            		<br/>
									            		<label htmlFor="fname">Your Answer:-  </label><span >{check_Answer ? "Correct" : "Incorrect"}</span >
											        </div>
								            	</div>
								            	<div className="more-select">
									            	<div className="input-box-web">
									            		<input type="button" onClick={()=>setIsExplaination(true)} className="submit-btn" value="Explaination"/>
											        </div>
										            <div className="input-box-web">
										              <input type="button" className="submit-btn" onClick={()=>next_Question()} value="Next"/>
											        </div>
								            	</div>
								            	</>
							            	}
						            	</>)
						            }
								</form>
							)}
						</div>
            		</div>
            	</div>
            <Footer/>
        </>
    )
}

export default Dashboard;