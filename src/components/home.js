
/*global chrome*/
import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import parse from 'url-parse';
import getCurrentTabUrl from '../detection/detection'
import PaywallBanner from './home-components/paywall-banner';
import DonationBanner from './home-components/donation-banner';
import HomeText from './home-components/home-text'
import Wrapper from './wrapper'
import TopUp from './home-components/topup';
import FooterWrapper from './home-components/footer-wrapper'
import InfoBanner from './home-components/info-banner'

const prod_endpoint = "https://api.joincobble.com/"
const dev_endpoint = "http://localhost:5000/"
const endpoint = dev_endpoint


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

function Home(props) {

    const [url, setUrl] = useState("")
    const [balance, setBalance] = useState(0)
    const [screen, setScreen] = useState("nonpartner")
    const [token, setToken] = useState(props.token)
    const [email, setEmail] = useState("no one")
    const [partners, setPartners] = useState([])

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

          if(result.okay) {
            getUser()
            setScreen("paid")
          }
          else {
            console.log(result)
          }
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
          setBalance(result.user.balance)
          setEmail(result.user.email)
        }
        else{
          console.log('getUser fail')
        }
      })
    }


    function getPartners(){
      fetch(endpoint+'partners', {
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
          setPartners(result.partners.donation)
        }
        else{
          console.log('getPartners fail')
        }
      })
    }
      
    function logOut(){
      localStorage.removeItem('authenticated')
      localStorage.removeItem('loginToken')

      window.close()
    }

    const stripURL = (url) => {
      return url.replace('http://','').replace('https://','').replace('www.', "").split(/[/?#]/)[0] 
    }

    const displayDollar = (cents) => {
      return (cents/100).toLocaleString("en-US", {style:"currency", currency:"USD"})
    }


    useEffect(() => { 
        
      window.addEventListener('load', function() {
          getCurrentTabUrl(function(url) {
            
            setUrl(url)
            parsedURL = parse(url)
            
            if (parsedURL.hostname === "twitter.com")
            {
              setScreen("twitter")
            }
            else if(partners.includes(parsedURL.hostname))
            {
              setScreen("partner")
            }
            else
            {
              setScreen("nonpartner")
            }
          });
      })
  
    });


    getUser()

    let parsedURL = parse(url)
    let strippedUrl = stripURL(parsedURL.hostname)
    let convertedBalance = displayDollar(balance)
    let body;
    let left= <a style={{marginTop:"0", marginBottom:"0"}} onClick={() => setScreen("topup")}>Top Up</a>
    let center=<p style={{marginBottom:"0"}}>Balance: {convertedBalance}</p>
    let right= <a onClick={logOut}>Log out</a>

   
    switch (screen) {
      case "partner":
        body = (<div>
                  <h3>Show {strippedUrl} some love!</h3>
                  <DonationBanner balance={balance}  makePayment={makePayment} setScreen={() => setScreen("paid")} currentUrl={url}/>
                </div>)
        break;
      case "paid":
        body = <h2 style ={{color:"white", marginTop:"50px"}}>Thank you!</h2>
        break
      case "topup":
        body = <div style = {{position:"relative", minHeight:"90%"}}>
                <TopUp makeDeposit={(amount) => getCardPage(token, amount)}/>
                <InfoBanner/>
               </div>
        break;
      case "twitter":
        let twitterUser = parsedURL.pathname.split("/")[1]
        let twitterProfile = `https://twitter.com/${twitterUser}`
        body = (<div>
          <h3>Show Twitter: <a target="_blank" href={twitterProfile}>{twitterUser}</a> some love!</h3>
          <DonationBanner balance={balance} makePayment={makePayment} setScreen={() => setScreen("paid")} url={url}/>
          <h4>This user is not a partner yet.</h4>
          <a target= "_blank"href="https://joincobble.com/FAQs.html">What does Cobble do with your donation?</a>
        </div>)
        break
      default:
        body = (<div>
          <h3>Show {strippedUrl} some love!</h3>
          <DonationBanner balance={balance} makePayment={makePayment} setScreen={() => setScreen("paid")} url={url}/>
          <h4>This site is not a partner yet.</h4>
          <a target= "_blank"href="https://joincobble.com/FAQs.html">What does Cobble do with your donation?</a>
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