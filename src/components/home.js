import React from 'react';
import 'antd/dist/antd.css';
import './home.css'

import getCurrentTabUrl from '../detection/detection'

import PaywallBanner from './paywall-banner';
import DonationBanner from './donation-banner';
import PayPalButton from './paypal'
import Wrapper from './wrapper'

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
  
    const header = <img src={logo} className="App-logo"></img> 
    let body;
    const footer = <h3 color="white">Our team is ready to <u>help</u></h3>
  
    if (paid == true)
    {
      body = (<div><Home balance={balance}/><h2 style ={{color:"white"}}>Thank you!</h2></div>)
    }
    else if(url == "https://joincobble.com/")
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

        <div>
            <h3 className = "home-text">
                Hi, Daniel
            </h3>
            <h3 className = "home-text">
                Your account balance:
            </h3>
            <h2 className = "home-text">
                <strong>{(props.balance/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</strong>
            </h2>
        </div>
    )

}

export default Home