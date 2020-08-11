import React, {useState, useEffect} from 'react';
import Router, { Link, goBack, goTo } from 'route-lite';
// const { Header, Content, Footer } = Layout;
import Register from './components/signup';
import Login from './components/login';
import Home from './components/home';
import Wrapper from './components/wrapper';

const prod_endpoint = "https://api.joincobble.com/"
const dev_endpoint = "http://localhost:5000/"

const App = () => {

  const [loginToken, setLoginToken] = useState(localStorage.getItem('loginToken') || 'noToken')
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') || false)
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)

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
        setLoading(false)
      } 
    })
  }

  function registerRequest(values){
    setLoading(true)
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
      }
      else
      {
        console.log(result)
      }
    })  
  }

  let ret

  if(authenticated)
  {
    ret = <Home token = {loginToken}/>
  }
  else if(loading)
  {
    ret = <Wrapper body={<h2 style={{color:'white'}}>Check your email to verify your account</h2>}/>
  }
  else if(isLogin)
  {
    ret = <Login loginRequest = {loginRequest} switchPage = {() => setIsLogin(false)}/> 
  }
  else if(!isLogin)
  {
    ret = <Register registerRequest = {registerRequest} switchPage = {() => setIsLogin(true)}/>
  }

  return( 
    ret
  )

}
  

export default App;
