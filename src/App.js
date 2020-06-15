import React, {useState, useEffect} from 'react';
import {Button} from 'antd';
import logo from './logo.png';
import './App.css';
import getCurrentTabUrl from './detection/detection'
// import { Layout} from 'antd';

// const { Header, Content, Footer } = Layout;
// import {PayPalButton} from 'react-paypal-button-v2'
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home'; 
import PaywallBanner from './components/paywall-banner';
import DonationBanner from './components/donation-banner';
import PayPalButton from './components/paypal'

const Wrapper = (props) => (
  <div className="App">
    <header className="App-header">{props.header}</header>
    <body className="App-body">{props.body}</body>
    <footer className="App-footer">{props.footer}</footer>
  </div>
  
);


const App = () => {

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

  const header = <img src={logo} className="App-logo"></img> 
  let body;
  const footer = <h3 color="white">Our team is ready to <u>help</u></h3>

  if (paid == true)
  {
    body = (<div><Home balance={balance}/><h2>Thank you!</h2></div>)
  }
  else if(url == "http://134.122.23.179/news")
  {
    body = (<div><Home balance={balance}/><PaywallBanner balance={balance} setBalance={writeAndSetBalance} setPaid={setPaid} currentUrl={url}/></div>)
    
  }
  else if (url == "https://eftakhairul.com/ssh-to-aws-ec2-instance-without-key-pairs/")
  {
    body = (<div><Home balance={balance}/><DonationBanner balance={balance} setBalance={writeAndSetBalance} setPaid={setPaid} currentUrl={url}/></div>)
    
  }
  else
  {
    body = <div><Home balance={balance}/><PayPalButton/></div>
    
  }

  return(
  <Wrapper
    header = {header}
    body = {body}
    footer = {footer}
    />
  )

}
  

export default App;
