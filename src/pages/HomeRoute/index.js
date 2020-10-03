import DepositPage from "./DepositPage/DepositPage.jsx"
import ErrorPage from "./ErrorPage/ErrorPage.jsx"
import MessagePage from "./MessagePage/MessagePage.jsx"
import PaidPage from "./PaidPage/PaidPage.jsx"
import HomePage from "./HomePage.jsx"

import React from "react"
import {Route} from "react-router-dom"

export default function HomeRoute(){
    return (
      <>
        <Route path={["/","/home"]} exact>
          <HomePage />
        </Route>

        <Route path="/home/nonpartner">
          <HomePage />
        </Route>

        <Route path="/home/partner">
          <HomePage />
        </Route>

        <Route path="/home/paid">
          <PaidPage />
        </Route>

        <Route path="/home/deposit">
          <DepositPage />
        </Route>

        <Route path="/home/twitter">
          <HomePage />
        </Route>

        <Route path="/home/error">
          <ErrorPage />
        </Route>

        <Route path="/home/message">
          <MessagePage />
        </Route>
      </>
    )
}