import DonationBanner from '../components/home-components/DonationBanner';
import React, {useState, useEffect} from 'react';
import TopUp from '../components/home-components/Topup';
import parse from 'url-parse';
import { Button } from 'antd';
import {useHistory,useLocation} from "react-router"
import api from "../api"
import {Route,Link} from "react-router-dom"
import Page from "../components/Page"


const prod_endpoint = "https://api.joincobble.com/"
const dev_endpoint = "http://localhost:5000/"
const endpoint = dev_endpoint


function getCurrentTabUrl(callback) {
  let chrome = window.chrome || {}

  if(!chrome.tabs){
    callback("localhost")
    return 
  } 

  chrome.tabs.query( { active: true, currentWindow: true }, tabs =>{
    console.log("tabs",tabs)
    callback(tabs[0].url)
  });
}

function openPageAndWriteToken(pageContent, token) {
  var x = window.open();
  x.document.open("_blank");
  x.document.write(pageContent);
  x.document.getElementById('user_token').value = token;
  x.document.close();
}

function getCardPage(token, amount, history){
  // let headers = {'Content-Type': 'multipart/form-data' }
  // let data = new FormData()
  // data.append("token",token)
  // data.append("amount",amount)

  // api.post("/deposit/card",data,{headers}).then(({data:page})=>{
  //   let url = `data:text/html,${encodeURIComponent(page)}`
  //   let w = window.open("","_parent")
  //   w.document.write(page)
    
  // }).catch(error=>{
  //   console.log(error);
  // })

  var w = window.open();
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
  history.push("/home/message")
}

function DefaultFooter({convertedBalance}){
  const history = useHistory()
  const location = useLocation()

  function logOut(){  
    localStorage.removeItem('authenticated')
    localStorage.removeItem('loginToken')
    history.push("/login")
    window.close()
  }

  const nav = location.pathname != "/home/topup" ? 
  (<Link to="/home/topup">Top Up</Link>) : 
  (<Link to="/home">Home</Link>)

  return (
    <div id="DefaultFooter">
        <div>
          {nav}
        </div>
        <div>
          <b>Balance: {convertedBalance}</b>
        </div>
        <div>
          <a onClick={logOut}>Log out</a>
        </div>
    </div>
  )
}

export default function Home(props) {
    const history = useHistory()
    const [url, setUrl] = useState("")
    const [balance, setBalance] = useState(2000) // temparary balance
    const [token, setToken] = useState(props.token)
    const [email, setEmail] = useState("no one")
    const [partners, setPartners] = useState([])

    useEffect(() => {
      onStart()
    },[]);

    const onStart = () => {
      getCurrentTabUrl(function(url) {
        setUrl(url)
        parsedURL = parse(url)
        
        if (parsedURL.hostname === "twitter.com")
          history.push("/home/twitter")
        else if(partners.includes(parsedURL.hostname))
          history.push("/home/partner")
        else
          history.push("/home")
      });
    }

    function logOut(){  
      localStorage.removeItem('authenticated')
      localStorage.removeItem('loginToken')
      history.push("/login")
      window.close()
    }

    //move this to donationBanner
    function makePayment(value, otherParams){
        api.post("/payments",{amount:value,...otherParams}).then(({data:result})=>{
            if(!result.okay){
              history.push({pathname:"/error",state:{message:result.message}})
              return 
            }

            getUser()
            history.push("/home/paid")
        }).catch(error=>{
          history.push({pathname:"/error",state:{message:error.response.data.message}})
        })   
    }
  
    function getUser(){
        api.get("/users").then(({data:result})=>{
          if(!result.okay){
            logOut()
            return
          }
          setBalance(result.user.balance)
          setEmail(result.user.email)
        }).catch(error=>{
          history.push({pathname:"/error",state:{message:error.response.data.message}})
        })
    }
    getUser()

    function getPartners(){
        api.get("/partners").then(({data:result})=>{
          if(!result.okay){
            history.push({pathname:"/error",state:{message:result.message}})
            return 
          }
          setPartners(result.partners.donation)
        }).catch(error=>{
          history.push({pathname:"/error",state:{message:error.response.data.message}})
        })
    }
      
    const stripURL = (url) => {
      return url.replace('http://','').replace('https://','').replace('www.', "").split(/[/?#]/)[0] 
    }

    const displayDollar = (cents) => {
      return (cents/100).toLocaleString("en-US", {style:"currency", currency:"USD"})
    }

    let parsedURL = parse(url)
    let strippedUrl = stripURL(parsedURL.hostname)
    let convertedBalance = displayDollar(balance)
    let twitterUser = parsedURL.pathname.split("/")[1]
    let twitterProfile = `https://twitter.com/${twitterUser}`
                  
    return(
        <>
          <Route path={["/","/home"]} exact>
            <Page>
              <div>
                <h3>Show {strippedUrl} some love!</h3>
                <DonationBanner {...{balance}} makePayment={(value) => makePayment(value, {'type':'donation', 'identifier': url})} />
                <p>This site is not a partner yet.</p>
                <a target= "_blank"href="https://joincobble.com/FAQs.html">So where does my support go?</a>
              </div>
              <DefaultFooter slot="footer" {...{convertedBalance}} />
            </Page>
          </Route>

          <Route path="/home/partner">
            <Page>
              <div>
                <h3>Show {strippedUrl} some love!</h3>
                <DonationBanner {...{balance,makePayment}} currentUrl={url}/>
              </div>
              <DefaultFooter slot="footer" {...{convertedBalance}} />
            </Page>
          </Route>

          <Route path="/home/paid">
            <Page>
              <h2 style ={{color:"white", marginTop:"50px"}}>Thank you!</h2>
              <Link to="/">
                <Button size="small" type="danger" shape="round">Back</Button>
              </Link>
              <DefaultFooter slot="footer" {...{convertedBalance}} />
            </Page>
          </Route>

          <Route path="/home/topup">
            <Page id="Topup">
              <div className="topupRoot">
                <TopUp makeDeposit={(amount) => getCardPage(token, amount, history)}/>
                <div className="infoBanner" >
                  <a href="https://joincobble.com/FAQs.html" target="_blank" >Why is there a $5 minimum?</a>
                  <a href="https://stripe.com/" target="_blank" >
                    Payments secured with 
                    <img className="stripe" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe"/>
                  </a>
                </div>
              </div>
              <DefaultFooter slot="footer" {...{convertedBalance}} />
            </Page>
          </Route>

          <Route path="/home/twitter">
            <Page>
              <div>
                <h3>Show tweeter <a target="_blank" href={twitterProfile}>{twitterUser}</a> some love!</h3>
                <DonationBanner {...{balance}} makePayment={(value) => makePayment(value, {'type':'twitter', 'identifier': twitterUser})} />
                <h4>This user is not a partner yet.</h4>
                <a target= "_blank"href="https://joincobble.com/FAQs.html">What does Cobble do with your donation?</a>
              </div>
              <DefaultFooter slot="footer" {...{convertedBalance}} />
            </Page>
          </Route>

          <Route path="/home/error">
            <Page>
              <div>
                <p>error</p>
                <Button shape="round" type="danger" onClick = {() => onStart()}>Go Back</Button>
              </div>
              <DefaultFooter slot="footer" {...{convertedBalance}} />
            </Page>
          </Route>

          <Route path="/home/nonpartner">
            <Page>
             <div>
                <h3>Show {strippedUrl} some love!</h3>
                <DonationBanner {...{balance}} makePayment={(value) => makePayment(value, {'type':'donation', 'identifier': url})} />
                <p>This site is not a partner yet.</p>
                <a target= "_blank"href="https://joincobble.com/FAQs.html">What does Cobble do with your donation?</a>
              </div>
              <DefaultFooter slot="footer" {...{convertedBalance}} />
            </Page>
          </Route>

          <Route path="/home/message">
            <Page id="Message">
              <h2>Add a Message</h2>
              <textarea placeholder="Thank you for ...."></textarea>
              <Link to="/"><Button size="small" type="danger" shape="round">Submit</Button></Link>
              <DefaultFooter slot="footer" {...{convertedBalance}} />
            </Page>
          </Route>
        </>
    )
}

