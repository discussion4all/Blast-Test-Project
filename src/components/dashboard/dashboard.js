import React from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import ApiServiceCall from "../../services/api";
import {  useHistory } from "react-router-dom";
const Dashboard = () => {
	const History =  useHistory();
	if (localStorage.getItem("token") === null) {
	    History.push("/");
	}
    return(
        <>
            <Header/>
            	<div className="container">
            		<div className="_vertical-center">
            			<div className="main-div">
						  <form >
						  	<div className="more-select">
				            	<div className="input-box-web">
				            		<input type="radio" name="examtype" /> 
						        </div>
					            <div className="input-box-web">
					              <input type="radio" name="examtype"/>
						        </div>
			            	</div>
						  	<div className="cut-box">
						    	<label for="fname">Question :-  </label><span >Question 2</span >
						    </div>
						    <div className="cut-box">
							    <label for="lname">Answer</label>
							    <input className="text-box-cust" type="text" id="answer" name="lastname" placeholder="Your answer"/>
							    <label for="fname">Hint :-  </label><span >Question 2</span >
							    <br/>
							    <label for="fname">Explaination :-  </label><span >Question 2</span >
							</div>
						    <div className="more-select">
				            	<div className="input-box-web">
				            		<input type="button" className="submit-btn" value="Hint"/>
						        </div>
					            <div className="input-box-web">
					              <input type="button" className="submit-btn" value="Submit"/>
						        </div>
			            	</div>
			            	<div className="more-select">
				            	<div className="input-box-web">
				            		<label for="fname">Correct Answer :-  </label><span >Question 2</span >
				            		<br/>
				            		<label for="fname">Your Answer:-  </label><span >Question 2</span >
						        </div>
					           
			            	</div>
			            	<div className="more-select">
				            	<div className="input-box-web">
				            		<input type="button" className="submit-btn" value="Explaination"/>
						        </div>
					            <div className="input-box-web">
					              <input type="button" className="submit-btn" value="Next"/>
						        </div>
			            	</div>
						  </form>
						</div>
            		</div>
            	</div>
            <Footer/>
        </>
    )
}

export default Dashboard;