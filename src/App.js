import React, {useState, useEffect} from 'react';
import {Button} from 'antd';
import logo from './logo.png';
import './App.css';
import getCurrentTabUrl from './detection/detection'
// import { Layout} from 'antd';

// const { Header, Content, Footer } = Layout;
import {PayPalButton} from 'react-paypal-button-v2'
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home'; 
import PaywallBanner from './components/paywall-banner';
import DonationBanner from './components/donation-banner';
// import PayPalButton from './components/paypal'


import data from './balance.json'

const Wrapper = (props) => (
  <div className="App">
    <header className="App-header">{props.header}</header>
    <body className="App-body">{props.body}</body>
    <footer className="App-footer">{props.footer}</footer>
  </div>
  
);

const App = () => {

  const [url, setUrl] = useState("")
  const [balance, setBalance] = useState(data['amount'])

  useEffect(() =>{
      
    window.addEventListener('load', function() {
        getCurrentTabUrl(function(url) {
          setUrl(url)
        });
    })

  });

  const header = <img src={logo} className="App-logo"></img> 
  let body;
  let footer;

  // if(screen == 0){
  //   body = <Login onClick={progessScreen}/>
  //   footer = <h3 color="white">Something Here About Logging In</h3>
  // }
  // else if (screen == 1){
  //   body = (<div><Home/><PayPalButton/></div>)
  //   footer = <h3 color="white">SomethiConfirmPayng Here about Confirming</h3>
 
  // }
  // else if (screen == 2) {
  //   body = <Home/>
  //   footer = <h3 color="white">Something Here about Balance</h3>
  // }

  if(url == "https://joincobble.com/")
  {
    body = (<div><Home balance={balance}/><PaywallBanner balance={balance} setBalance={setBalance} currentUrl={url}/></div>)
    footer = <h3 color="white">Something about confirming</h3>
  }
  else if (url == "https://eftakhairul.com/")
  {
    body = (<div><Home balance={balance}/><DonationBanner balance={balance} setBalance={setBalance}/></div>)
    footer = <h3 color="white">Something Here about Balance</h3>
  }
  else
  {
    body = <Home balance={balance}/>
    footer = <h3 color="white">Something Here about Balance</h3>
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
