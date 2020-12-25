import config from "../config";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const api_url = config.server.ip + config.server.port+"/";

const ApiServiceCall = {
    login: async function(value){
        return await axios.post(api_url + "login",value).then(function (response) {
            return response
        })
        .catch(function (response) {
           return response;
        });
    },
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
    getAllHardQuestion : async function(value){
        //set token in header option
        setAuthToken(); 
        return await axios.get(api_url + "getAllHardQuestion").then(function (response) {
            return response
        })
        .catch(function (response) {
           return response;
        });
    }
    
}

export default ApiServiceCall;