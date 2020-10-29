import {LoginPage, SignupPage, ForgotPage, ErrorPage, 
CheckRegisterPage, CheckForgotPage,ContactPage, HomeRoute} from "../../pages"
import {ProtectedRoute} from "../"
import {MemoryRouter,Route} from "react-router-dom"
import React, {createContext,useReducer} from 'react';
import {reducer,defaultState} from "../../util"

import "./App.scss"

export const Context = createContext()

export default function App(){
  const [state,dispatch] = useReducer(reducer,defaultState)

  return (
    <Context.Provider value={{state,dispatch}}>
    <main className="App">
      <MemoryRouter>
        <ProtectedRoute path="/" exact>
            <HomeRoute />
        </ProtectedRoute>
          
        <ProtectedRoute path="/home" >
            <HomeRoute />
        </ProtectedRoute>

        <Route path="/login">
            <LoginPage />
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

        <Route path="/contact">
            <ContactPage />
        </Route>

        <Route path="/error">
          <ErrorPage />
        </Route>
      </MemoryRouter>
    </main>  
    </Context.Provider>    
  )
}
  


