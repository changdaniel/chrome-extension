import React from 'react'
import {Page} from "../../components"
import {Link} from "react-router-dom"

import "./CheckForgotPage.scss"

export default function CheckForgotPage(){
    return (
      <Page className="CheckForgotPage">
        <h2 className="title">A password reset link has been sent to your email.</h2>
        <Link to="/"><button className="primary">Okay</button></Link>
      </Page>
    )
}