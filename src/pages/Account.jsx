import React,{useContext} from 'react'
import {config,mix} from "../util"
import {Layout,Context,Button} from "../components"
import styled from "styled-components"
import stripeLogo from "../assets/media/stripe-logo.svg"


let Style = styled.main`
    ${mix.col()}
    ${mix.gap(5)}

    div{
        ${mix.row()}
        ${mix.w("400px")}

        img{
            min-height: 18px;
            height: 18px;
            box-sizing: content-box;
            position: relative;
            top: 4px;
            left: 5px;
        }
    }
`


export function Account() {
    let context = useContext(Context)
    let card = context.state.user.card

    return (
        <Layout>
            <Style>
                <h5>{!card ? "Please add a card to start" : "Your account is already linked to a card"}</h5>
                <a href={config.websiteUrl + `/account/card?token=${context.state.token}`} target="_blank" rel="noreferrer">
                    <Button primary>{!card ? "Add Card" : "Change card"}</Button>
                </a>
            
                <div>
                    <a href="https://stripe.com/" target="_blank" rel="noreferrer">
                        Payments secured with 
                        <img src={stripeLogo} alt="Stripe"/>
                    </a>
                </div>
            </Style>
        </Layout>
    )
}
