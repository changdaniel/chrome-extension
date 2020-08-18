import React, {useState, useEffect} from 'react';
import Router, { Link, goBack, goTo } from 'route-lite';
// const { Header, Content, Footer } = Layout;
import Register from './components/signup';
import Login from './components/login';
import Forgot from './components/forgot'
import Home from './components/home';
import Wrapper from './components/wrapper';

const prod_endpoint = "https://api.joincobble.com/"
const dev_endpoint = "http://localhost:5000/"

const App = () => {

  const [loginToken, setLoginToken] = useState(localStorage.getItem('loginToken') || 'noToken')
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') || false)
  const [screen, setScreen] = useState("login")

  const endpoint =  prod_endpoint

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
    })
  }

  function registerRequest(values){
    setScreen("check")
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
        console.log('register okay')
        setScreen("check")
      }
      else
      {
        console.log(result)
      }
    })  
  }

  console.log(screen)
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
        ret = <Forgot switchPage={() => setScreen("login")}/>
        break;
      case "check":
          ret = <Wrapper 
                  body = {
                      <div>
                        <h2 style={{color:'white'}}>Check your email to verify your account.</h2>
                        <h3>This window needs to be reopened after verification</h3>
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
