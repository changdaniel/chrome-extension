import React from 'react'
import {Page,HomeFooter} from "../../../components"
import {Link} from "react-router-dom"

import "./MessagePage.scss"

export default function MessagePage(){
    return (
        <Page className="MessagePage">
            <h2>Add a Message</h2>
            <textarea placeholder="Thank you for ...."></textarea>
            <Link to="/home/paid">
                <button className="primary">Submit</button>
            </Link>
            <HomeFooter slot="footer"/>
        </Page>
    )
}