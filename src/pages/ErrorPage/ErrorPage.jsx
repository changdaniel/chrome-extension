import { useLocation } from 'react-router';
import {Link} from "react-router-dom"
import React from 'react'
import {Page} from "../../components"

import "./ErrorPage.scss"

export default function ErrorPage(){
    let location = useLocation()
  
    return (
      <Page className="ErrorPage">
          <h1>Error</h1>
          <p>{location.state.message || "A server error has occurred. If this persists please contact us at hello@joincobble.com"}</p>
          <Link to="/" >
            <button className="primary">Go back</button>
          </Link>
      </Page>
    )
  }