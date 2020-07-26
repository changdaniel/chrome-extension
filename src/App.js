import React, {useState, useEffect} from 'react';
import Router, { Link, goBack, goTo } from 'route-lite';
// const { Header, Content, Footer } = Layout;
import Register from './components/signup';
import Login from './components/login';
import Home from './components/home';




const App = () => {

  const [loginToken, setLoginToken] = useState(localStorage.getItem('loginToken') || 'noToken')
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') || false)
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)

  function loginRequest(values){

    fetch('http://127.0.0.1:5000/auth/login', {
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
    fetch('http://127.0.0.1:5000/auth/register', {
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
        loginRequest(values)
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
    ret = <p> Logging you in...</p>
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
