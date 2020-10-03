import {Page,HomeFooter,InputMoney} from "../../components"
import React,{useEffect,useState} from 'react'
import {useHistory} from "react-router"
import api from "../../util/api"

import "./HomePage.scss"

function DonationBanner(props) {
  const history = useHistory()
  let [value, setValue] = useState(300)

  function logOut(){  
      localStorage.removeItem('authenticated')
      localStorage.removeItem('loginToken')
      history.push("/login")
      window.close()
  }

  function makePayment(value){
      api.post("/payments",{amount:value}).then(({data:result})=>{
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
      history.push("/home/message")
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

    function getCurrentTabUrl() {
      let chrome = window.chrome || {}
      if(!chrome.tabs){
        setUrl("localhost")
        return 
      } 
      chrome.tabs.query( { active: true, currentWindow: true }, tabs =>{
        setUrl(tabs[0].url)
      });
    }

    //format url here
    //check partner list and see if url exists

    return (
    <Page className="HomePage">
     
        <h3>Show {url} some love!</h3>
        <DonationBanner />
        {/* <p>This site is not a partner yet.</p> */}
        <a target= "_blank"href="https://joincobble.com/FAQs.html">So where does my support go?</a>
      
        <HomeFooter slot="footer" />
    </Page>
    )
}