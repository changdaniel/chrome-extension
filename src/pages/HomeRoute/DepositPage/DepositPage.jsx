import {Page,InputMoney,HomeFooter} from "../../../components"
import {useHistory} from "react-router"
import React,{useState} from 'react'

import "./DepositPage.scss"

function TopUp(props){
    let defaultValue = 500
    const [value, setValue] = useState(defaultValue)

    return(
        <div className="TopUp">
            <h3 style={{color:"white", marginBottom:"20px"}}>
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
    const history = useHistory()
    const prod_endpoint = "https://api.joincobble.com/"
    const dev_endpoint = "http://localhost:5000/"
    const endpoint = dev_endpoint

    //make this a api request
    function getCardPage(amount){
      
      let w = window.open();
      let token = localStorage.getItem("loginToken")

      let dom = `
        <p>Loading...</p>
        <form action="${endpoint}/deposit/card" method="POST">
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
            <a href="https://joincobble.com/FAQs.html" target="_blank" >Why is there a $5 minimum?</a>
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