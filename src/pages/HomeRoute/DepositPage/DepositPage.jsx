import {Page,InputMoney,HomeFooter,Context} from "../../../components"
import React,{useState,useContext} from 'react'
import {url} from "../../../util"

import "./DepositPage.scss"

function TopUp(props){
    let defaultValue = 500
    const [value, setValue] = useState(defaultValue)

    return(
        <div className="TopUp">
            <h3>
                How much would you like to deposit?
            </h3>
            <InputMoney onChange={setValue} min={500} default={defaultValue}/>
            <div>
                <button className="primary" onClick={() => props.makeDeposit(value)}>Make Deposit</button>
            </div>
        </div>
    )
}

export default function DepositPage(){
    let context = useContext(Context)

    //make this a api request
    function getCardPage(amount){
      context.dispatch({type:"SET_BALANCE",payload:context.state.balance + (amount/100)})

      let w = window.open();
      let token = localStorage.getItem("token")

      let dom = `
        <p>Loading...</p>
        <form action="${url}/deposit/card" method="POST">
          <input type="hidden" name="token" value="${token}"/>
          <input type="hidden" name="amount" value="${amount}"/>
        </form>
        <script>document.querySelector("form").submit()</script>    
      `
      w.document.write(dom)
      w.document.close()
    }

    return (
      <Page className="DepositPage">
        <div className="topupRoot">
          <TopUp makeDeposit={(amount) => getCardPage(amount)}/>
          <div className="infoBanner" >
            <a href="https://joincobble.com/#faq" target="_blank" >Why is there a $5 minimum?</a>
            <a href="https://stripe.com/" target="_blank" >
              Payments secured with 
              <img className="stripe" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe"/>
            </a>
          </div>
        </div>
        <HomeFooter slot="footer" />
      </Page>
    )
}