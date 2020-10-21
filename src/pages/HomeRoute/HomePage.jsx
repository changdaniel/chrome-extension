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

      axios.post("/payments",{amount:value,type:"donation",identifier:props.url}).then(({data:result})=>{
          if(!result.okay){
            history.push({pathname:"/error",state:{message:result.message}})
            return 
          }

          history.push("/home/message")
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

    useEffect(() => {
      getCurrentTabUrl()
    },[]);
    
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

    //check partner list and see if url exists

    return (
    <Page className="HomePage">
     
        <h3>Show {prepUrl(url)} some love!</h3>
        <DonationBanner url={url}/>
        <a target= "_blank"href="https://joincobble.com/#faq">So what does cobble do with your support?</a>
      
        <HomeFooter slot="footer" />
    </Page>
    )
}