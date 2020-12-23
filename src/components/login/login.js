import React from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import ApiServiceCall from "../../services/api";
import {  useHistory } from "react-router-dom";
const Login = () => {
	const History =  useHistory();
	const onSubmit = async () => {
		try {
			var result = await ApiServiceCall.login({});
			if(result.data.err === null){
				window.localStorage.setItem("token", result.data.data);
				History.push('/dashboard')
			}else{
				alert("Something wrong!")
			}
		}catch (e) {
			console.log("===>",e);
		}
	}
    return(
        <>
            <Header/>
            	<div className="container">
            		<div className="vertical-center">
            			<button className="button" onClick={onSubmit}>Start Exam</button>
            		</div>
            	</div>
            <Footer/>
        </>
    )
}

export default Login;