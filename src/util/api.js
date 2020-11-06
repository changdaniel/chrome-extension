import axios from "axios"
import React,{useContext} from "react"
import {Context} from "../components"

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

export let url = baseURL

export function useAxios(){
  let context = useContext(Context)

  let api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      authorization:context.state.token,
      crossDomain: true,
      contentType: 'application/json; charset=utf-8'
    }
  });

  return api
}



