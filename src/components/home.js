
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

function createWindow(callback) {
   
    chrome.windows.create({
         url: 'http://localhost:5000/make-deposit',
         type: 'popup'}, callback)
 
 }
  

function Home(props) {

    const [url, setUrl] = useState("")
    const [balance, setBalance] = useState(0)
    const [paid, setPaid] = useState(false)
    
    function writeAndSetBalance(amount){
  
      fetch(`http://127.0.0.1:5000/set-balance?amount=${amount}`)
      .then(res => res.json())
      .then((result) => {
        setBalance(result)
        setPaid(true)
      })
    }
  
    function getBalance(){
      fetch(`http://127.0.0.1:5000/get-balance`)
      .then(res => res.json())
      .then((result) => {
        setBalance(result)
      })
    }
  
    useEffect(() =>{
        
      window.addEventListener('load', function() {
          getCurrentTabUrl(function(url) {
            setUrl(url)
          });
          getBalance();
          setPaid(false);
      })
  
    });
  
    let body;
    const footer = <h3 color="white">Our team is ready to <u>help</u></h3>
    
    if (paid == true)
    {
      body = (<div><HomeText balance={balance}/><h2 style ={{color:"white"}}>Thank you!</h2></div>)
    }
    else if(url == "https://joincobble.com/")
    {
      body = (<div><HomeText balance={balance}/><PaywallBanner balance={balance} setBalance={writeAndSetBalance} setPaid={setPaid} currentUrl={url}/></div>)
      
    }
    else if (url == "https://eftakhairul.com/ssh-to-aws-ec2-instance-without-key-pairs/")
    {
      body = (<div><HomeText balance={balance}/><DonationBanner balance={balance} setBalance={writeAndSetBalance} setPaid={setPaid} currentUrl={url}/></div>)
      
    }
    else
    {
      body = <div><HomeText balance={balance}/><img onClick ={() => createWindow()} style={{width:'140px', "pointer-events": "all"}} src = {StripeButton}/></div>
      
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