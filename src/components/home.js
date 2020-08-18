
/*global chrome*/
import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';

import getCurrentTabUrl from '../detection/detection'
import PaywallBanner from './home-components/paywall-banner';
import DonationBanner from './home-components/donation-banner';
import HomeText from './home-components/home-text'
import Wrapper from './wrapper'
import TopUp from './home-components/topup';
import FooterWrapper from './home-components/footer-wrapper'

// function createWindow(callback) {
   
//     chrome.windows.create({
//          url: 'http://localhost:5000/make-deposit',
//          type: 'popup'}, callback)
 
//  }

const prod_endpoint = "https://api.joincobble.com/"
const dev_endpoint = "http://localhost:5000/"
const endpoint = prod_endpoint


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
  form.setAttribute('action', endpoint+'deposit/card')
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
  fetch(endpoint+'deposit/amount', {
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
    const [screen, setScreen] = useState("nonpartner")
    const [token, setToken] = useState(props.token)
    const [email, setEmail] = useState("no one")

    console.log(url);

    function makePayment(values){
  
      fetch(endpoint+'payments', {
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
      fetch(endpoint+'users', {
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

          if(url == "https://eftakhairul.com/")
          {
            setScreen("partner")
          }
          else
          {
            setScreen("nonpartner")
          }

          setPaid(false);
          setDeposited(false);
      })
  
    });


    getUser()
  
    let body;
    let left= <a style={{marginTop:"0", marginBottom:"0"}} onClick={() => setScreen("topup")}>Top Up</a>
    let center=<p style={{marginBottom:"0"}}>Balance: {(balance/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
    let right= <a onClick={logOut}>Log out</a>
   
    switch (screen) {
      case "partner":
        body = (<div>
                  <h3>Show {url.replace('http://','').replace('https://','').replace('www.', "").split(/[/?#]/)[0]} some love!</h3>
                  <DonationBanner makePayment={makePayment} setScreen={() => setScreen("paid")} currentUrl={url}/>)
                </div>)
        break;
      case "paid":
        body = (<div><HomeText email={email} balance={balance}/><h2 style ={{color:"white"}}>Thank you!</h2></div>)
        break
      case "topup":
        body = <TopUp makeDeposit={(amount) => getCardPage(token, amount)}/>
        left = <a style={{marginTop:"0", marginBottom:"0"}} onClick={() => setScreen("nonpartner")}>Go Back</a>
        break;
      default:
        body = (<div>
          <h3>Show {url.replace('http://','').replace('https://','').replace('www.', "").split(/[/?#]/)[0]} some love!</h3>
          <DonationBanner makePayment={makePayment} setScreen={() => setScreen("paid")} currentUrl={url}/>
          <h4>This site is not a partner yet.</h4>
          <a target= "_blank"href="https://joincobble.com/#contact">What does Cobble do with your donation?</a>
        </div>)
        break
    }


    let footer = <FooterWrapper
                  left= {left}
                  center = {center}
                  right = {right}
                  />

    return(
        <Wrapper
        body = {body}
        footer = {footer}
        >
        </Wrapper>
    )

}

export default Home