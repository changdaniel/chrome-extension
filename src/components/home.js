
/*global chrome*/
import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';

import getCurrentTabUrl from '../detection/detection'
import PaywallBanner from './home-components/paywall-banner';
import DonationBanner from './home-components/donation-banner';
//import PayPalButton from './home-components/paypal'
import StripeButton from './home-components/stripe-button.svg';
import HomeText from './home-components/home-text'
import Wrapper from './wrapper'

// function createWindow(callback) {
   
//     chrome.windows.create({
//          url: 'http://localhost:5000/make-deposit',
//          type: 'popup'}, callback)
 
//  }

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFhZGRhMTIxMjEyQGEuY29tIiwiZXhwIjoxNTk1ODM4MjAmgt2cJYfxYqGDfp_S9fVWs97sSSAksMuhzDhU2Rk'

function openPageAndWriteToken(pageContent, token) {
  var x = window.open();
  x.document.open("_blank");
  x.document.write(pageContent);
  x.document.getElementById('user_token').setAttribute('value', token)
  x.document.close();
}
 
function createWindow(token) {
  fetch('http://localhost:5000/deposit/amount', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'authorization': token
    }
  })
  .then(res => res.text())
  .then(data => openPageAndWriteToken(data, token))
}

function getValidPartners(token) {
  fetch('http://localhost:5000/deposit/amount', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'authorization': token
    }
  })
  .then(res => res.json)
}

function Home(props) {

    const [url, setUrl] = useState("")
    const [balance, setBalance] = useState(0)
    const [paid, setPaid] = useState(false)
    const [token, setToken] = useState(props.token)
    const [email, setEmail] = useState("no one")
    
    function makePayment(values){
  
      fetch('http://localhost:5000/payments', {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'authorization': token
          },
        body:JSON.stringify(values)
        })
        .then(res => res.json())
        .then((result) => {

          getUser()
          setPaid(true) 
      })
    }
  
    function getUser(){
      fetch('http://localhost:5000/users', {
        'method': 'GET',
        'headers': {
        'Content-Type': 'application/json',
        'authorization': token
      }
    })
    .then(res => res.json())
    .then((result) => {
        if(result.okay)
        {
          console.log(result)
          setBalance(result.user.balance)
          setEmail(result.user.email)
        }
        else{
          console.log('getUser fail')
        }
      })
    }
  
    useEffect(() => {
        
      window.addEventListener('load', function() {
          getCurrentTabUrl(function(url) {
            setUrl(url)
          });
          setPaid(false);
      })
  
    });

    getUser()
  
    let body;
    const footer = <h3 color="white">Our team is ready to <u>help</u></h3>
    
    if (paid == true)
    {
      body = (<div><HomeText email={email} balance={balance}/><h2 style ={{color:"white"}}>Thank you!</h2></div>)
    }
    // else if(url == "https://joincobble.com/")
    // {
    //   body = (<div><HomeText balance={balance}/><PaywallBanner makePayment={makePayment} setPaid={setPaid} currentUrl={url}/></div>)
      
    // }
    else if (url == "https://eftakhairul.com/ssh-to-aws-ec2-instance-without-key-pairs/")
    {
      body = (<div><HomeText email={email} balance={balance}/><DonationBanner makePayment={makePayment} setPaid={setPaid} currentUrl={url}/></div>)
      
    }
    else
    {
      body = <div><HomeText email={email} balance={balance}/><img onClick ={() => createWindow(token)} style={{width:'140px', "pointer-events": "all"}} src = {StripeButton}/></div>
      
    }

    return(
        <Wrapper
        body = {body}
        footer = {footer}
        >
        </Wrapper>
    )

}

export default Home