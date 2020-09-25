import DonationBanner from '../components/home-components/DonationBanner';
import React, {useState, useEffect} from 'react';
import InfoBanner from '../components/home-components/InfoBanner'
import TopUp from '../components/home-components/Topup';
import parse from 'url-parse';
import { Button } from 'antd';
import {useHistory} from "react-router"
import api from "../api"
import {Route,Link} from "react-router-dom"
import Page from "../components/Page"


const prod_endpoint = "https://api.joincobble.com/"
const dev_endpoint = "http://localhost:5000/"
const endpoint = dev_endpoint


function getCurrentTabUrl(callback) {
  // chrome object doesint container tabs for some reason 
  callback(window.location.href)
}

function openPageAndWriteToken(pageContent, token) {
  var x = window.open();
  x.document.open("_blank");
  x.document.write(pageContent);
  x.document.getElementById('user_token').value = token;
  x.document.close();
}

function getCardPage(token, amount){
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
}

function DefaultFooter({convertedBalance}){
  const history = useHistory()

  function logOut(){  
    localStorage.removeItem('authenticated')
    localStorage.removeItem('loginToken')
    history.push("/login")
    window.close()
  }

  return (
    <div style={{width:"100%", paddingLeft:"20px", paddingRight:"20px"}}>
        <div style={{float:"left"}}>
          <Link to="/home/topup">Top Up</Link>
        </div>
        <div style={{float:"right"}}>
          <a onClick={logOut}>Log out</a>
        </div>
        <div style={{margin:"0 auto", textAlign: "center"}}>
          <p style={{marginBottom:"0"}}>Balance: {convertedBalance}</p>
        </div>
    </div>
  )
}

export default function Home(props) {
    const history = useHistory()
    const [url, setUrl] = useState("")
    const [balance, setBalance] = useState(0)
    const [token, setToken] = useState(props.token)
    const [email, setEmail] = useState("no one")
    const [partners, setPartners] = useState([])

    //dependency array makes it only run once 
    useEffect(() => {
      onStart()
    },[]);

    function logOut(){  
      localStorage.removeItem('authenticated')
      localStorage.removeItem('loginToken')
      history.push("/login")
      window.close()
    }

    function makePayment(value, otherParams){
        api.post("/payments",{amount:value,...otherParams}).then(({data:result})=>{
            if(!result.okay){
              history.push({pathname:"/error",state:{message:result.message}})
              return 
            }

            getUser()
            history.push("/home/paid")
        }).catch(error=>{
          history.push({pathname:"/error",state:{message:error.message}})
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
          history.push({pathname:"/error",state:{message:error.message}})
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
          history.push({pathname:"/error",state:{message:error.message}})
        })
    }
      
    const stripURL = (url) => {
      return url.replace('http://','').replace('https://','').replace('www.', "").split(/[/?#]/)[0] 
    }

    const displayDollar = (cents) => {
      return (cents/100).toLocaleString("en-US", {style:"currency", currency:"USD"})
    }

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
                <a target= "_blank"href="https://joincobble.com/FAQs.html">What does Cobble do with your donation?</a>
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
              <DefaultFooter slot="footer" {...{convertedBalance}} />
            </Page>
          </Route>

          <Route path="/home/topup">
            <Page>
              <div style = {{position:"relative", minHeight:"90%"}}>
                <TopUp makeDeposit={(amount) => getCardPage(token, amount)}/>
                <InfoBanner/>
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
        </>
    )
}

