/*global chrome*/
import {Login, Register, Forgot, Error, CheckRegister, CheckForgot, Home} from "./pages"
import ProtectedRoute from "./components/ProtectedRoute"
import {MemoryRouter,Route} from "react-router-dom"
import React, {useState} from 'react';

import 'antd/dist/antd.css'
import "./styles/App.scss"

export default function App(){

  const [loginToken, setLoginToken] = useState(localStorage.getItem('loginToken'))
  
  return (
    <main className="App">
      <MemoryRouter>
        <ProtectedRoute path="/" exact>
            <Home token={loginToken}/>
        </ProtectedRoute>

        <ProtectedRoute path="/home" >
            <Home token={loginToken}/>
        </ProtectedRoute>

        <Route path="/login">
            <Login {...{setLoginToken}} />
        </Route>

        <Route path="/register" >
            <Register />
        </Route>

        <Route path="/forgot">
            <Forgot />
        </Route>

        <Route path="/check-register">
            <CheckRegister />
        </Route>

        <Route path="/check-forgot">
            <CheckForgot />
        </Route>

        <Route path="/error">
          <Error />
        </Route>
      </MemoryRouter>
    </main>      
  )
}
  


