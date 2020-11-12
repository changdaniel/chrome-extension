import {MdEmail as EmailIcon} from "react-icons/md"
import {Page} from "../../components"
import React from 'react'

import "./ContactPage.scss"

export default function ContactPage() {
    function sendMail(){
        //send email to backend
    }

    return (
        <Page className="ContactPage">
            <div className="input">
                <EmailIcon></EmailIcon>
                <input type="email" name="email" htmlFor="email" placeholder="Email" required/>
            </div>
            <textarea name="message" placeholder="Enter message"></textarea>
            <button className="primary" onClick={sendMail}>Send email</button>
        </Page>
    )
}
