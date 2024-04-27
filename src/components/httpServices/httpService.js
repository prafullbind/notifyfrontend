import axios from "axios";
import auth from "../httpServices/auth";

const getUser = auth.getUser();
let token = getUser?.token || '';

///const baseApiUrl = "http://localhost:2410/notify";
const baseApiUrl = "https://notify-backend-brown.vercel.app/notify"

function get(url){
    return axios.get(baseApiUrl+url, {
        headers: {
          token: token,
        }
    })
}

function post(url, body){
    return axios.post(baseApiUrl+url, body);
}

function put(url, body){
    return axios.put(baseApiUrl+url, body);
}

function deletReq(url){
    return axios.delete(baseApiUrl+url);
}

export default {
    get,
    post,
    put,
    deletReq
}