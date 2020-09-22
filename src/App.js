import React, {useState} from 'react';
import Register from './components/auth-components/Signup';
import Login from './components/auth-components/Login';
import Forgot from './components/auth-components/Forgot'
import Home from './components/Home';
import Wrapper from './components/Wrapper';
import { Button } from 'antd';

import "./styles/App.scss"
import 'antd/dist/antd.css';

const prod_endpoint = "https://api.joincobble.com/"
const dev_endpoint = "http://localhost:5000/"

const App = () => {

  const [loginToken, setLoginToken] = useState(localStorage.getItem('loginToken') || 'noToken')
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') || false)
  const [screen, setScreen] = useState("login")
  const [error, setError] = useState(null)

  const endpoint =  dev_endpoint

  const displayError = (message) => {

    setError(message)
    setScreen("error")
  
  }

  function loginRequest(values){

    fetch(endpoint+'auth/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(res => res.json())
    .then((result) => {

      if(result.okay)
      {
        setLoginToken(result.token)
        localStorage.setItem('loginToken', result.token)
        setAuthenticated(true)
        localStorage.setItem('authenticated', true)
      }
      else
      {
        displayError(result.message)
      } 
    })
  }

  function registerRequest(values){
    setScreen("check-register")
    fetch(endpoint+'auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(res => res.json())
    .then((result) => {

      if(result.okay)
      {
        setScreen("check-register")
      }
      else
      {
        displayError(result.message)
      }
    })  
  }

  function forgotPasswordRequest(values){
    setScreen("check-forgot")
    console.log(values)
    fetch(endpoint+'auth/forget_password_request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(res => res.json())
    .then((result) => {

      if(result.okay)
      {
        setScreen("check-forgot")
      }
      else
      {
        displayError(result.message)
      }
    })  
  }

  let ret

  if(authenticated)
  {
    ret = <Home token = {loginToken}/>
  }
  else
  {
    switch (screen)
    {
      case "login":
        ret = <Login loginRequest = {loginRequest} forgotPassword = {() => setScreen("forgot")} switchPage = {() => setScreen("register")}/> 
        break;
      case "register":
        ret = <Register registerRequest = {registerRequest} switchPage = {() => setScreen("login")}/>
        break;
      case "forgot":
        ret = <Forgot forgotPasswordRequest = {forgotPasswordRequest} switchPage={() => setScreen("login")}/>
        break;
      case "check-register":
          ret = <Wrapper 
                  body = {
                      <div>
                        <h2 style={{color:'white'}}>Check your email to verify your account.</h2>
                        <h3>This window needs to be reopened after verification</h3>
                      </div>
                      }/>
      case "check-forgot":
          ret = <Wrapper 
                  body = {
                      <div>
                        <h2 style={{color:'white'}}>Check your email to reset your password.</h2>
                      </div>
                      }/>
        break;
      case "error":
        ret = <Wrapper
                body = 
                {<div>
                    <p>{error}</p>
                    <Button shape="round" type="danger" onClick = {() => setScreen("login")}>Go Back</Button>
                  </div>
                }/>
        break;
    }

  }

  return( 
    ret
  )

}
  

export default App;
