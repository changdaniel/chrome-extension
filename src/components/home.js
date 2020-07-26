
/*global chrome*/
import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';

import getCurrentTabUrl from '../detection/detection'
import PaywallBanner from './home-components/paywall-banner';
import DonationBanner from './home-components/donation-banner';
import StripeButton from './home-components/stripe-button.svg';
import HomeText from './home-components/home-text'
import Wrapper from './wrapper'
import TopUp from './home-components/topup';
// function createWindow(callback) {
   
//     chrome.windows.create({
//          url: 'http://localhost:5000/make-deposit',
//          type: 'popup'}, callback)
 
//  }


function openPageAndWriteToken(pageContent, token) {
  var x = window.open();
  x.document.open("_blank");
  x.document.write(pageContent);
  x.document.getElementById('user_token').value = token;
  x.document.close();
}

function getCardPage(token, amount){
  var w = window.open();
  var message = w.document.createElement('p')
  w.document.body.appendChild(message)
  message.value = "Loading..."

  var form = w.document.createElement('form');
  var token_input = w.document.createElement('input')
  var amount_input = w.document.createElement('input')
  form.setAttribute('action', 'http://localhost:5000/deposit/card')
  form.setAttribute('method', 'POST')
  token_input.setAttribute('name', 'token')
  token_input.setAttribute('type', 'hidden')
  token_input.value = token
  amount_input.setAttribute('name', 'amount')
  amount_input.setAttribute('type', 'hidden')
  amount_input.value = amount

  w.document.body.appendChild(form)
  form.appendChild(token_input)
  form.appendChild(amount_input)

  form.submit()
  w.document.close()
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

// function makeDeposit(token) {
//   document.createElement
// }

function Home(props) {

    const [url, setUrl] = useState("")
    const [balance, setBalance] = useState(0)
    const [paid, setPaid] = useState(false)
    const [deposited, setDeposited] = useState(false)
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
      
    function logOut(){
      localStorage.removeItem('authenticated')
      localStorage.removeItem('loginToken')

      window.close()
    }


    useEffect(() => { 
        
      window.addEventListener('load', function() {
          getCurrentTabUrl(function(url) {
            setUrl(url) 
          });
          setPaid(false);
          setDeposited(false);
      })
  
    });


    getUser()
  
    let body;
    const footer = <h3 color="white"><a onClick={logOut}>Log out</a></h3>
    
    if (paid == true)
    {
      body = (<div><HomeText email={email} balance={balance}/><h2 style ={{color:"white"}}>Thank you!</h2></div>)
    }
    // else if(url == "https://joincobble.com/")
    // {
    //   body = (<div><HomeText balance={balance}/><PaywallBanner makePayment={makePayment} setPaid={setPaid} currentUrl={url}/></div>)
      
    // }
    else if (url == "https://eftakhairul.com/")
    {
      body = (<div><HomeText email={email} balance={balance}/><DonationBanner makePayment={makePayment} setPaid={setPaid} currentUrl={url}/></div>)
      
    }
    else if (deposited == true)
    {
      body = (<TopUp makeDeposit={(amount) => getCardPage(token, amount)}/>)
    }
    else
    {
      body = <div><HomeText email={email} balance={balance}/><img onClick ={() => setDeposited(true)} style={{width:'140px', "pointer-events": "all"}} src = {StripeButton}/></div>
      
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