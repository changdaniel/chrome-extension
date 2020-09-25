import axios from "axios"

const PROD = "https://api.joincobble.com"
const DEV = "http://localhost:5000"
const baseURL = DEV
const token = localStorage.getItem("loginToken") || ""

export default axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      authorization:token,
      'Access-Control-Allow-Origin': '*',
      crossdomain: true
    }
});



