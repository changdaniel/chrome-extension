import axios from "axios"

const PROD = "https://api.joincobble.com"
const DEV = "http://localhost:5000"

//configure api from .env key 
let baseURL
if(process.env.REACT_APP_ENV === "development")
  baseURL = DEV
else if(process.env.REACT_APP_ENV === "production")
  baseURL = PROD
else
  baseURL = DEV

const token = localStorage.getItem("loginToken") || ""
console.log(process.env)

export default axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      authorization:token,
      'Access-Control-Allow-Origin': '*',
      crossdomain: true
    }
});



