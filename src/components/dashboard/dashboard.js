import React,{useState,useEffect} from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import PreLoading from "../common/preloading";
import ApiServiceCall from "../../services/api";
import {  useHistory } from "react-router-dom";
const Dashboard = () => {
	const History =  useHistory();
	if (localStorage.getItem("token") === null) {
	    History.push("/");
	}
	const [startloader, setStartloader] = useState(false);
	const [typeofexam, setTypeofexam] = useState("");
	const [questionDataset,setQuestionDataset] = useState([]);
	const [answerAction,setAnswerAction] = useState(false);
	const [oneQuestion,setOneQuestion] = useState({})
	const [isHint,setIsHint]= useState(false);
	const [isExplaination,setIsExplaination]= useState(false);
	const [datasetNumber,setDatasetNumber] = useState(1);
	const [showQuestion,setShowQuestion]  = useState(false);
	const [userAnswer,setUserAnswer] = useState("");
	const [check_Answer,setCheck_Answer]= useState("");
	useEffect(() => {
	   getQuestionData();
	}, []);
	const getQuestionData = async ()=>{
		var value = {"set":datasetNumber};
		setStartloader(true)
		var getdata = await ApiServiceCall.getOneQuestionSet(value);
		if(getdata.data.err === null){
			if(getdata.data.data.length > 0){
				setQuestionDataset(getdata.data.data[0])
				setOneQuestion(getdata.data.data[0].Questions[0])
				//setQuestion(getdata.data.data[0].Questions[0])
				setStartloader(false);
			}
		}else{
			console.log("Somthing wrong")
		}
	}
	const setQuestion = async (qdataset,type)=>{
		if(type === "hardtoeasy"){
			const b = qdataset.find((item) => item.Type === 'Hard')
			setOneQuestion(b)
		}
	}
	const changeExamType = async(e)=>{
		setTypeofexam(e.target.value)
		setQuestion(questionDataset.Questions,e.target.value);
		setShowQuestion(true)
	}
	const checkAnswer = async()=>{
		setAnswerAction(true);
		console.log(oneQuestion.Answer.trim().toLowerCase() === userAnswer.trim().toLowerCase(),oneQuestion.Answer.trim().toLowerCase() , userAnswer.trim().toLowerCase())
		if(oneQuestion.Answer.trim().toLowerCase() === userAnswer.trim().toLowerCase()){
			setCheck_Answer(true)
		}else{
			setCheck_Answer(false)
		}
	}
	const next_Question = async()=>{
		setIsExplaination(false)
		setCheck_Answer("")
		isHint(false)
	}
	const sentenceCheck =(data)=>{
		var tmparray = data.split(" ");
		var filtered = tmparray.filter(function (el) {
		  return el != null;
		});
		return filtered.join(" ");
	}
    return(
        <>
        	{startloader && <PreLoading/>}
            <Header/>
            	<div className="container">
            		<div className="_vertical-center">
            			<div className="main-div">
            				{questionDataset.length !== 0 && (
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
										    	<label htmlFor="fname">Question :-  </label><span >{oneQuestion.Question}</span >
										    </div>
										    <div className="cut-box">
											    <label htmlFor="lname">Answer</label>
											    <input className="text-box-cust" onChange={(e) => setUserAnswer(e.target.value)} type="text" id="answer" name="lastname" placeholder="Your answer"/>
											    {isHint && <><label htmlFor="fname">Hint :-  </label><span >{oneQuestion.Hint}</span ></> }
											    
											    <br/>
											    {isExplaination && <><label htmlFor="fname">Explaination :-  </label><span >{oneQuestion.Explanation}</span ></> }
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
									            		<label htmlFor="fname">Correct Answer :-  </label><span >{oneQuestion.Answer}</span >
									            		<br/>
									            		<label htmlFor="fname">Your Answer:-  </label><span >{check_Answer ? "Correct" : "Incorrect"}</span >
											        </div>
								            	</div>
								            	<div className="more-select">
									            	<div className="input-box-web">
									            		<input type="button" onClick={()=>setIsExplaination(true)} className="submit-btn" value="Explaination"/>
											        </div>
										            <div className="input-box-web">
										              <input type="button" className="submit-btn" value="Next"/>
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