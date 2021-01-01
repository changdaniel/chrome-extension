import {Page,InputMoney,HomeFooter,Context} from "../../../components"
import React,{useState,useContext} from 'react'
import {config} from "../../../util"

import "./DepositPage.scss"



export default function DepositPage(){
    let context = useContext(Context)
    let card = context.state.user.card
    

    return (
      <Page className="DepositPage">

        <h3>{!card ? "Please add a card to start" : "Your account is already linked to a card"}</h3>
        <a href={config.websiteUrl + `/account/card?token=${context.state.token}`} target="_blank">
        <button className="primary">{!card ? "Add Card" : "Change card"}</button>
        </a>
      
        <div className="infoBanner" >
          <a className="smallGray" href="https://stripe.com/" target="_blank" >
            Payments secured with 
            <img className="stripe" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe"/>
          </a>
        </div>
        <HomeFooter slot="footer" />
      </Page>
    )
}