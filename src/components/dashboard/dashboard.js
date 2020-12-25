import React,{useState,useEffect, useRef} from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import PreLoading from "../common/preloading";
import ApiServiceCall from "../../services/api";
import {  useHistory } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


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

	
	const [correctPracticeAnswer,setCorrectPracticeAnswer] = useState({});
	const [practicePass,setPracticePass] = useState("");
	const [showAudio,setShowAudio] = useState(false);
	const [showPracticeResult,setShowPracticeResult] = useState(false);
	const [showOptions,setShowOptions] = useState(false);

	const player = useRef();

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
				setShowOptions(true);
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
		setShowOptions(false);
	}
	const checkAnswer = async(sessionPass)=>{
		setAnswerAction(true);

		if(props.dataprops.questionData.oneQuestion.Answer.replace(/\s+/g,' ').trim().toLowerCase() === userAnswer.replace(/\s+/g,' ').trim().toLowerCase()){
			setCheck_Answer(true)
			if(sessionPass !== undefined){
				if(practicePass === "easy"){
					console.log("correct anser practice---",correctPracticeAnswer);	
					setCorrectPracticeAnswer({...correctPracticeAnswer,easyCorrect:correctPracticeAnswer.easyCorrect+1});
				}else{
					setCorrectPracticeAnswer({...correctPracticeAnswer,hardCorrect:correctPracticeAnswer.hardCorrect+1});
				}
			}
		}else{
			setCheck_Answer(false)
			if(sessionPass !== undefined){
				if(practicePass === "easy"){
					setCorrectPracticeAnswer({...correctPracticeAnswer,easyIncorrect:correctPracticeAnswer.easyIncorrect+1});
				}else{
					setCorrectPracticeAnswer({...correctPracticeAnswer,hardIncorrect:correctPracticeAnswer.hardIncorrect+1});
				}
			}
		}
	}
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
				setIsExplaination(false)
				
				setAnswerAction(false)
				setIsHint(false)
				if(quizType === "easytohard"){
					setCheck_Answer("")
					console.log(questionNumber + 1 , allQuestion.Questions.length,questionNumber + 1 > allQuestion.Questions.length)
					if(questionNumber + 1 >= allQuestion.Questions.length){
						setQuestionNumber(0)
						setDatasetNumber(datasetNumber+1)
						getQuestionData(datasetNumber+1);
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
							setDatasetNumber(datasetNumber+1)
							getQuestionData(datasetNumber+1);
						}else{
							setDatasetNumber(datasetNumber+1)
							setQuestionNumber(questionNumber + 1)
							props.dataprops.setOneQuestion(allQuestion.Questions[questionNumber])
						}
						
						
					}
					
				}
			}
	}

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
						History.push("/audio");
					}
				}else{
					console.log("Somthing wrong")
				}	
			}
		} catch (error) {
			console.log("Error:",error);
		}
		
	}
	

	const getRandomQuestion = (questions) => {
		
		let allQuestion = [];
		console.log("question---",questions);
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
			if(practicePass === "easy"){
				setShowAudio(true);
				setShowQuestion(false);
				setTimeout(() => {
					stopAudio();
				}, 30000);
			}else{
				console.log("Result------------",correctPracticeAnswer);
				setShowQuestion(false);
				setShowPracticeResult(true);
			}
        }
	}

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
	
    return(
        <>
        	{startloader && <PreLoading/>}
            <Header/>
            	<div className="container">
            		<div className="_vertical-center">
            			<div className="main-div">
						
            				{/* {props.dataprops.questionData.allQuestion.length !== 0 && ( */}
								<form >
									{ showOptions && (
										<>
										<input type="button" className="submit-btn" onClick={()=>startStudySession()} value="Study Session"/>
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
											    <input className="text-box-cust" onChange={(e) => setUserAnswer(e.target.value)} type="text" id="answer" name="lastname" placeholder="Your answer" value={userAnswer} />
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
											<div className="container">
												<h4>Please listen to this music while you take a mental break.</h4>
												<AudioPlayer
												autoPlay
												src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
												ref={player}
												/>
												
												<CountdownCircleTimer
													isPlaying
													duration={30}
													colors={[
													['#004777', 0.33],
													['#F7B801', 0.33],
													['#A30000', 0.33],
													]}
												>
													{({ remainingTime }) => remainingTime}
												</CountdownCircleTimer>
											
											</div>
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
											</div>
										)
									}
								</form>
							{/* )} */}
						</div>
            		</div>
            	</div>
            <Footer/>
        </>
    )
}

export default Dashboard;