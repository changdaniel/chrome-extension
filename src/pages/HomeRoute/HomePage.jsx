/*global chrome*/
import {Page,HomeFooter,InputMoney} from "../../components"
import React,{useEffect,useState,useContext} from 'react'
import {useHistory} from "react-router"
import {useAxios} from "../../util"
import {Context} from "../../components"

import "./HomePage.scss"

function DonationBanner(props) {
  const history = useHistory()
  const context = useContext(Context)
  const axios = useAxios()
  let [value, setValue] = useState(300)

  function makePayment(value){

      axios.post("/users/payments",{amount:value,type:"donation",identifier:props.url}).then(({data:result})=>{
          if(!result.okay){
            history.push({pathname:"/error",state:{message:result.message}})
            return 
          }

          history.push("/home/paid")
      }).catch(error=>{
        history.push({pathname:"/error",state:{message:error.response.data.message}})
      })   
  }

  const rangeSlide = (event) => {
      let value = event.target.value
      if(event.target.id === "rangeValue"){
          value = Number(value.slice(1)) * 100
      }
      setValue(value)
  }

  const onClick = (event) => {
      makePayment(value)
      context.dispatch({type:"SET_BALANCE",payload:context.state.balance - (value/100)})
  }

  return(
      
      <section className="DonationBanner">
          <InputMoney value={value} onChange={setValue}/>
          
          <input 
          className="range"
          type="range" 
          name="" 
          min="100" 
          max="1000"
          defaultValue="300"
          onChange={rangeSlide}
          /> 

          <button onClick={onClick} className="primary">Show the love!</button>
      </section>
  )

}

export default function HomePage(){
    let [url,setUrl] = useState("")
    let [partner,setPartner] = useState(false)
    const axios = useAxios()

    useEffect(() => {
      getCurrentTabUrl() 
    },[]);

    useEffect(()=>{
      if(!url) return 
      getPartners()
    },[url])
    
    const prepUrl = url => url ? url.split("//")[1].split("/")[0].replace("www.","") : ""

    function getCurrentTabUrl() {
      let chrome = window.chrome || {}
      //if extension is in development
      if(!chrome.tabs){
        setUrl("http://localhost.com")
        return 
      } 
      chrome.tabs.query( { active: true, currentWindow: true }, tabs =>{
        setUrl(tabs[0].url)
      });
    }

    //make this a post with just one url 
    function getPartners(){
      axios.get("/partners").then(results=>{
        let partnerBool = results.data.partners.includes(url)
        setPartner(partnerBool)
      })
    }

    return (
    <Page className="HomePage">
     
        <h3>Show {prepUrl(url)} some love!</h3>
        <DonationBanner url={url}/>
        <p className="smallGray">{!partner ? "This site is not a Cobble partner yet." : "This site is a partner."}</p>
        <a className="smallGray" target= "_blank"href="https://joincobble.com/?faqi=1&scrollto=faq">So what does Cobble do with your support?</a>
      
        <HomeFooter slot="footer" />
    </Page>
    )
}