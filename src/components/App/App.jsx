/*global chrome*/
import {LoginPage, SignupPage, ForgotPage, ErrorPage, CheckRegisterPage, CheckForgotPage, HomeRoute} from "../../pages"
import {ProtectedRoute} from "../"
import {MemoryRouter,Route} from "react-router-dom"
import React, {useState} from 'react';

import "./App.scss"

export default function App(){

  const [loginToken, setLoginToken] = useState(localStorage.getItem('loginToken'))
  
  return (
    <main className="App">
      <MemoryRouter>
        <ProtectedRoute path="/" exact>
            <HomeRoute />
        </ProtectedRoute>
          
        <ProtectedRoute path="/home" >
            <HomeRoute />
        </ProtectedRoute>

        <Route path="/login">
            <LoginPage {...{setLoginToken}} />
        </Route>

        <Route path="/signup" >
            <SignupPage />
        </Route>

        <Route path="/forgot">
            <ForgotPage />
        </Route>

        <Route path="/check-register">
            <CheckRegisterPage />
        </Route>

        <Route path="/check-forgot">
            <CheckForgotPage />
        </Route>

        <Route path="/error">
          <ErrorPage />
        </Route>
      </MemoryRouter>
    </main>      
  )
}
  


