import React, { useEffect } from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import {  useHistory } from "react-router-dom";

//display answer components
const Answerdisplay = (props) => {
	
	const History =  useHistory();
	if(props.dataprops.questionData.answers.length <= 0){
		History.push("/question/quizSession");
	}else if (props.dataprops.user.token === null || props.dataprops.user.token === "") {
	    History.push("/");
	}
	useEffect(() => {
	}, []);
	
	return (<div>
			<Header/>
            	<div className="container">
            		<div className="_vertical-center">
            			<div className="main-div">
							<h2 className="heading">{props.dataprops.questionData.quizType} Method</h2>
            				<h4>Answer</h4>
            				{ 
            					props.dataprops.questionData.answers.map((ansData,index)=>{
            						return (
            						<div key={index}>
            							<h5>QuestionSet :- {ansData.QuestionSet}</h5>
            							{ansData.answers.map((oneans,index)=>{
            								return (<><label htmlFor="lname">Answer {oneans.questionNumber + 1} : </label><span>{oneans.answer ? "Correct" : "Incorrect"}</span><br/></>)
            							})}
            						</div>
            						)
            					})
            				}
            			</div>
            		</div>
            	</div>
            <Footer/>
		</div>)
}

export default Answerdisplay;