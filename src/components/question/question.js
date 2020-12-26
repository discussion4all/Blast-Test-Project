import React,{useState,useEffect, useRef} from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import PreLoading from "../common/preloading";
import ApiServiceCall from "../../services/api";
import {  useHistory, useParams } from "react-router-dom";

import Answerdisplay from "./answerdisplay"
import AudioDisplay from "./audio";

const Question = (props) => {
	const History =  useHistory();
	if (props.dataprops.user.token === null || props.dataprops.user.token === "") {
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

	
	const [correctPracticeAnswer,setCorrectPracticeAnswer] = useState({});
	const [practicePass,setPracticePass] = useState("");
	const [showAudio,setShowAudio] = useState(false);
	const [showPracticeResult,setShowPracticeResult] = useState(false);
	const [showOptions,setShowOptions] = useState(false);
	const [lblheading,setLblheading] = useState("");

	const player = useRef();

	var {session} = useParams();
    
	useEffect(() => {
		//check session type
		if(session === "quizSession"){
	    	getQuestionData(datasetNumber);
			setShowOptions(true);
			setLblheading("Quiz Session");
	    }else{
			startStudySession();
	    	setShowOptions(false);
			setLblheading("Study Session");
		}
	}, []);

	//get set wise data.
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
				History.push("/answer");
			}
		}else{
			console.log("Somthing wrong")
		}
	}

	//set question
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

	//set exam type which is selected by user
	const changeExamType = async(e)=>{
		props.dataprops.setquizType(e.target.value)
		setQuestion(props.dataprops.questionData.allQuestion.Questions,e.target.value);
		setShowQuestion(true)
		setShowOptions(false);
	}

	//check answer correct or not
	const checkAnswer = async(sessionPass)=>{
		setAnswerAction(true);
		// setUserAnswer("");
		if(props.dataprops.questionData.oneQuestion.Answer.replace(/\s+/g,' ').trim().toLowerCase() === userAnswer.replace(/\s+/g,' ').trim().toLowerCase()){
			setCheck_Answer(true)
			setAnswerResult(true);
			if(sessionPass !== undefined){
				//if answer correct check which practice pass
				if(practicePass === "easy"){
					//increment count
					setCorrectPracticeAnswer({...correctPracticeAnswer,easyCorrect:correctPracticeAnswer.easyCorrect+1});
				}else{
					setCorrectPracticeAnswer({...correctPracticeAnswer,hardCorrect:correctPracticeAnswer.hardCorrect+1});
				}
			}
		}else{
			setCheck_Answer(false)
			setAnswerResult(false);
			if(sessionPass !== undefined){
				//if answer incorrect check which practice pass
				if(practicePass === "easy"){
					//increment count
					setCorrectPracticeAnswer({...correctPracticeAnswer,easyIncorrect:correctPracticeAnswer.easyIncorrect+1});
				}else{
					setCorrectPracticeAnswer({...correctPracticeAnswer,hardIncorrect:correctPracticeAnswer.hardIncorrect+1});

				}
			}
		}
		
	}
	
	const changeanswer = (answer)=>{
		setUserAnswer(answer);
	}

	//if user's answer correct, save it in db(only in exam session).
	const saveLogForUser = async()=>{
	var {oneQuestion }=props.dataprops.questionData;
		var reqObject = {
			LearnerID: props.dataprops.user.id,
			SourceID : oneQuestion.SourceID,
			ChapterID : oneQuestion.ChapterID,
			PageNumber : oneQuestion.PageNumber,
			isHint : isHint,
			answer : check_Answer,
			isExplaination:isExplaination
		}
		ApiServiceCall.saveLogForUser(reqObject)
	}

	const setAnswerResult = async(answerstatus)=>{
		var {answers,quizType}= props.dataprops.questionData;

		if(answers.length <= 0){
			var ans = {
				QuestionSet : datasetNumber,
				quizType : quizType,
				answers:[{questionNumber : questionNumber,answer:answerstatus}]
			}
			props.dataprops.setAllAnswers([ans])	
		}else{
			const dataans = answers.find((item) => item.QuestionSet === datasetNumber);
			if(dataans === undefined){
				var ans = {
					QuestionSet : datasetNumber,
					quizType : quizType,
					answers:[{questionNumber : questionNumber,answer:answerstatus}]
				}
				answers.push(ans)
				props.dataprops.setAllAnswers(answers)
			}else{
				answers.map((data_ans,index)=>{
					if(data_ans.QuestionSet === datasetNumber){
						var onedata =  {questionNumber : questionNumber,answer:answerstatus};
						dataans.answers.push(onedata)
						props.dataprops.setAllAnswers(answers)	
					}
				});
			}
		}
	}

	//set next question
	const next_Question = async(sessionType)=>{
	
		if(sessionType !== undefined && sessionType === "practiceSession"){
			setIsExplaination(false)
			setAnswerAction(false)
			setIsHint(false)
			setCheck_Answer("");
			setUserAnswer("");
			getRandomQuestion();
		}else{
	
			var {quizType,allQuestion } = props.dataprops.questionData;
			saveLogForUser();
			setIsExplaination(false)
			setAnswerAction(false)
			setIsHint(false)
			setUserAnswer("");
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
	}
	
	// start study session and display random question
	const startStudySession = async () => {
		try {
			setStartloader(true)
			var getdata = await ApiServiceCall.getAllEasyQuestion();
			let questionsArray = [];
			if(getdata !== undefined){
				if(getdata.data.err === null){
					if(getdata.data.data.length > 0){
						getdata.data.data.forEach(questions => {
							questionsArray = questionsArray.concat(questions.Questions);
						});
						props.dataprops.setAllQuestion(questionsArray);
						console.log("questionsArray", questionsArray);
						getRandomQuestion(questionsArray);
						
						setStartloader(false);
						setPracticePass("easy");
						var obj = {
							"easyCorrect":0,
							"easyIncorrect":0,
							"hardCorrect":0,
							"hardIncorrect":0
						}
						setCorrectPracticeAnswer(obj);
					}else{
						History.push("/");
					}
				}else{
					console.log("Somthing wrong")
				}	
			}
		} catch (error) {
			console.log("Error:",error);
		}
		
	}
	
	//get random question
	const getRandomQuestion = (questions) => {
		
		let allQuestion = [];
		
		if(questions === undefined || questions === null){
			allQuestion = props.dataprops.questionData.allQuestion;
			console.log(props.dataprops.questionData.allQuestion,allQuestion);
		}else{
			allQuestion = questions;
		}
		
		if (allQuestion.length > 0) {
            var optionsE = Math.floor(Math.random() * allQuestion.length);
			console.log("Item---  ",allQuestion.length,allQuestion[optionsE]);

			props.dataprops.setOneQuestion(allQuestion[optionsE]);
			var removedE = allQuestion.splice(optionsE, 1);
			props.dataprops.setAllQuestion(allQuestion);
			setShowQuestion(true)
			setShowOptions(false);
        } else {
			console.log("yes empty");
			// if all easy questions completetd.
			if(practicePass === "easy"){
				setShowAudio(true);
				setShowQuestion(false);
				setTimeout(() => {
					stopAudio();
				}, 30000);
			}else{
				//if all hard question done , show result
				setShowQuestion(false);
				setShowPracticeResult(true);
			}
        }
	}

	//after 30 sec stop audio
	const stopAudio = async () => {
		
		try {
			player.current.audio.current.pause();
			setShowAudio(false);
			setStartloader(true);
			var getdata = await ApiServiceCall.getAllHardQuestion();
			let questionsArray = [];
			if(getdata !== undefined){
				if(getdata.data.err === null){
					if(getdata.data.data.length > 0){
						getdata.data.data.forEach(questions => {
							questionsArray = questionsArray.concat(questions.Questions);
						});
						props.dataprops.setAllQuestion(questionsArray);
						console.log("questionsArray", questionsArray);
						getRandomQuestion(questionsArray);
						
						setStartloader(false);
						setPracticePass("hard");
					}
				}else{
					console.log("Somthing wrong")
				}	
			}
			
		} catch (error) {
			console.log("Error:",error);
		}
		
	}
	
	//close study session.
	const closeSession = () => {
		History.push("/");
	}
	
    return(
        <>
        	{startloader && <PreLoading/>}
            <Header showMenu={false} />
            	<div className="container">
            		<div className="_vertical-center">
						<div className="main-div">
								<h1 className="heading">{lblheading}</h1>
						</div>
            			<div className="main-div">

            				{props.dataprops.questionData.length !== 0 && (
								<form >
									{ showOptions && (
										<>
									  	<div className="more-select" onChange={(e)=>changeExamType(e)}>
							            	<div className="input-box-web">
							            		<input type="radio" value="easytohard" name="examtype" /> <span >Easy to Hard</span >
									        </div>
								            <div className="input-box-web">
								              <input type="radio" value="hardtoeasy" name="examtype"/><span >Hard to Easy</span >
									        </div>
										</div>
										
										</>
										)
						            }
					            	{showQuestion &&(
						            	<>
										  	<div className="cut-box">
										    	<label htmlFor="fname">Question :-  </label><span >{props.dataprops.questionData.oneQuestion.Question}</span >
										    </div>
										    <div className="cut-box">
											    <label htmlFor="lname">Answer</label>
											    <input className="text-box-cust" onChange={(e) => changeanswer(e.target.value) } value={userAnswer} type="text" id="answer" name="lastname" placeholder="Your answer"/>
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
										            {
														practicePass != "" ? 
														
														<input type="button" className="submit-btn" onClick={()=>checkAnswer('practiceSession')} value="Submit"/>
														
														:
														<input type="button" className="submit-btn" onClick={()=>checkAnswer()} value="Submit"/>
													}   
													 
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
										            {
														practicePass != "" ? 
														<input type="button" className="submit-btn" onClick={()=>next_Question('practiceSession')} value="Next"/>
														:
														<input type="button" className="submit-btn" onClick={()=>next_Question()} value="Next"/>
													}
													  
											        </div>
								            	</div>
								            	</>
							            	}
						            	</>)
						            }
									{
										showAudio &&(
											<AudioDisplay playerRef={player} />
										)
									}
									
									{
										showPracticeResult &&(
											<div>
												<h3>Your results for the Study Session :</h3>
												<h4>Pass One:</h4>
												<p>Correct Answer= {correctPracticeAnswer.easyCorrect}</p>
												<p htmlFor="lname">Incorrect Answer= {correctPracticeAnswer.easyIncorrect}</p>
												<br/>
												<h4>Pass Two:</h4>
												<p htmlFor="lname">Correct Answer= {correctPracticeAnswer.hardCorrect}</p>
												<p htmlFor="lname">Incorrect Answer= {correctPracticeAnswer.hardIncorrect}</p>
												<input type="button" className="submit-btn" onClick={()=>closeSession()} value="Close Session"/>
											</div>
										)
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

export default Question;