import React from 'react'
import {Page} from "../../components"
import {Link} from "react-router-dom"

import "./CheckRegisterPage.scss"

export default function CheckRegisterPage(){
    return (
      <Page className="CheckRegisterPage">
        <p>Confirmation email has been sent, please check your inbox and confirm you email (the email might be in your promotions tab).</p>
        <Link to="/"><button className="primary">Login</button></Link>
      </Page>    
    )
  }