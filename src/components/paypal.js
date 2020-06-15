import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";


function PayPal(){
    return(
    <div style = {{width:"30px"}}>
    <PayPalButton
      amount="0.01"
      style = {{    
        label: "pay",
        tagline: "false",
        layout:"horizontal", 
        color:'gold', 
        label:'paypal'}}
      // options = {{disableFunding: ['credit'], clientId:'AdEJ1br2W4BUH6JUMIkW5H_IFSznHMXzZ2j4xSDckAZy8hGkZNqBDWw-ZxsBBDlNjZfZL905wQk_Y6fv'}}
      shippingPreference="NO_SHIPPING"
      onSuccess={(details, data) => {
        alert("Transaction completed by " + details.payer.name.given_name);

        // OPTIONAL: Call your server to save the transaction
        return fetch("/paypal-transaction-complete", {
          method: "post",
          body: JSON.stringify({
            orderID: data.orderID
          })
        });
      }}
    />
  </div>
  )

}

export default PayPal