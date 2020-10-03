import React from 'react'
import {Page,HomeFooter} from "../../../components"
import {Link} from "react-router-dom"

import "./ErrorPage.scss"

export default function ErrorPage(){
    return (
    <Page className="ErrorPage">
        <div>
            <h1>Error</h1>
            <Link to="/">
                <button className="primary" >Go Back</button>
            </Link>
        </div>
        <HomeFooter slot="footer" />
    </Page>
    )
}