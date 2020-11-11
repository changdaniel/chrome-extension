import {Page,InputMoney,HomeFooter,Context} from "../../../components"
import React,{useState,useContext} from 'react'
import {config} from "../../../util"

import "./DepositPage.scss"

function TopUp(props){
    let defaultValue = 1000
    const [value, setValue] = useState(defaultValue)

    return(
        <div className="TopUp">
            <h3>
                Increase balance by:
            </h3>
            <InputMoney onChange={setValue} min={500} default={defaultValue}/>
            <div>
                <button className="primary" onClick={() => props.makeDeposit(value)}>Increase balance</button>
            </div>
        </div>
    )
}

export default function DepositPage(){
    let context = useContext(Context)

    function getCardPage(amount){
      context.dispatch({type:"SET_BALANCE",payload:context.state.balance + (amount/100)})
      let token = localStorage.getItem("token")

      let a = document.createElement("a")
      a.href = config.websiteUrl + `/payments/${amount}?token=${token}`
      a.target = "_blank"
      a.click()    
    }

    return (
      <Page className="DepositPage">
        <TopUp makeDeposit={(amount) => getCardPage(amount)}/>
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