import config from "../config";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

//set api url for API
const api_url = config.server.ip + config.server.port+"/";

const ApiServiceCall = {
    //API call for login user
    login: async function(value){
        return await axios.post(api_url + "login",value).then(function (response) {
            return response
        })
        .catch(function (response) {
           return response;
        });
    },
    //API call for get all question
    getAllQuestion: async function(value){
        //set token in header option
        setAuthToken(); 
        return await axios.get(api_url + "getAllQuestion",value).then(function (response) {
            return response
        })
        .catch(function (response) {
           return response;
        });
    },
    //API call for get one question set
    getOneQuestionSet : async function(value){
        //set token in header option
        setAuthToken(); 
        return await axios.post(api_url + "getOneQuestionSet",value).then(function (response) {
            return response
        })
        .catch(function (response) {
           return response;
        });
    },
    //API call to get all easy question
    getAllEasyQuestion : async function(value){
        //set token in header option
        setAuthToken(); 
        return await axios.get(api_url + "getAllEasyQuestion").then(function (response) {
            return response
        })
        .catch(function (response) {
           return response;
        });
    },
    //API call to get all hard question
    getAllHardQuestion : async function(value){
        //set token in header option
        setAuthToken(); 
        return await axios.get(api_url + "getAllHardQuestion").then(function (response) {
            return response
        })
        .catch(function (response) {
           return response;
        });
    },
    //API call for set data user log
    saveLogForUser :  async function(value){
        //set token in header option
        setAuthToken(); 
        return await axios.post(api_url + "saveLogForUser",value).then(function (response) {
            return response
        })
        .catch(function (response) {
           return response;
        });
    }
    
}

export default ApiServiceCall;