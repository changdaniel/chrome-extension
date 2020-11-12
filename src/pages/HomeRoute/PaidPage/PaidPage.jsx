import {Page,HomeFooter} from "../../../components"
import {Link} from "react-router-dom"
import React from 'react'

import "./PaidPage.scss"

export default function PaidPage(){
    return (
    <Page className="PaidPage">
        <h2 className="title">Thank you!</h2>
        <Link to="/">
          <button className="primary">Back</button>
        </Link>
        <HomeFooter slot="footer"/>
      </Page>
    )
}