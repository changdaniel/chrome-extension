import React, {useState, useEffect} from 'react';
import Router, { Link, goBack, goTo } from 'route-lite';
// const { Header, Content, Footer } = Layout;
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home'; 




const App = () => {

  const [loginToken, setLoginToken] = useState(localStorage.getItem('loginToken') || 'noToken')
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') || false)

  function loginRequest(values){

    fetch(`http://127.0.0.1:8000/auth/login`, {
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

  return(
    <Router>
      {authenticated 
        ? <Home/>
        : <Login loginRequest = {loginRequest}/>
        }
    </Router>
  )

}
  

export default App;
