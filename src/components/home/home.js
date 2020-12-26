import React, { useEffect } from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import ApiServiceCall from "../../services/api";
import {  useHistory } from "react-router-dom";

//Home components
const Home = (props) => {

	const History =  useHistory();
	useEffect(() => {
		console.log("props--",props);
		var obj = {
			allQuestion : [],
			oneQuestion : {},
			quizType : "",
			answers : []
		}
		props.dataprops.setInitialState(obj);
		console.log("props--",props);
		getToken();
	 }, []);

	 //get token when page load
	const getToken = async () => {
		try {
			var result = await ApiServiceCall.login({});
			if(result.data.err === null){
				window.localStorage.setItem("token", result.data.data);
				props.dataprops.setToken(result.data.data)
				
			}else{
				alert("Something wrong!")
			}
		}catch (e) {
			console.log("===>",e);
		}
	}
    return(
        <>
            <Header showMenu={true}/>
            	<div className="container">
            		<div className="vertical-center">
						<h1>Welcome to quiz portal</h1>
            		</div>
            	</div>
            <Footer/>
        </>
    )
}

export default Home;