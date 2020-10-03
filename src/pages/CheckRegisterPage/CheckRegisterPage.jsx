import React from 'react'
import {Page} from "../../components"

import "./CheckRegisterPage.scss"

export default function CheckRegisterPage(){
    return (
      <Page className="CheckRegisterPage">
        <div>
          <h2 className="title">Check your email to verify your account.</h2>
          <h3>This window needs to be reopened after verification</h3>
        </div>
      </Page>    
    )
  }