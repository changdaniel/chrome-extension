import { useLocation } from 'react-router';
import {Link} from "react-router-dom"
import React from 'react'
import {Page} from "../../components"

import "./ErrorPage.scss"

export default function ErrorPage(){
    let location = useLocation()
  
    return (
      <Page className="ErrorPage">
        <div>
          <p>{location.state.message}</p>
          <Link to="/" >
            <button className="primary">Go Back</button>
          </Link>
        </div>
      </Page>
    )
  }