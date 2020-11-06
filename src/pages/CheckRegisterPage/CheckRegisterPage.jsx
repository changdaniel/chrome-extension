import React from 'react'
import {Page} from "../../components"
import {Link} from "react-router-dom"

import "./CheckRegisterPage.scss"

export default function CheckRegisterPage(){
    return (
      <Page className="CheckRegisterPage">
        <p>We’ve sent you a confirmation email. Please confirm your account then log in.</p>
        <Link to="/"><button className="primary">Log in</button></Link>
        <p className="gray">Can’t find the email? Please check your spam folder.</p>
        
        <footer slot="footer">
          <p>Contact us : hello@joincobble.com</p>
        </footer>
      </Page>    
    )
  }