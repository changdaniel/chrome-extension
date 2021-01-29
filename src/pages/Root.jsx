import {Layout,Input,Context,Button,Form} from "../components"
import React,{useEffect,useState,useContext} from 'react'
import {useHistory} from "react-router"
import {useAxios,config,mix} from "../util"
import styled from "styled-components"
import {themeGet} from "@styled-system/theme-get"
import {BiDollar} from "react-icons/bi"


const Style = styled.main`
    ${mix.col()}
    ${mix.gap(4)}

    section{
        ${mix.col()}
    }

    form{
        width:100%;
    }

    a,p{
        color:${themeGet("colors.grey.17")};
    }
`


export function Root() {
    let {url,partner,prepUrl} = useRootHook()

    return (
        <Layout>
            <Style>
                <h5>Show {prepUrl(url)} some love!</h5>
                <DonationBanner url={url}/>
                <p>{!partner ? "This site is not a Centiments partner yet." : ""}</p>
                <Button link>
                    <a target= "_blank" rel="noreferrer" href={`${config.websiteUrl}/?faqi=0&scrollto=faq`}>
                        {!partner ? "So what does Centiments do with your support?" : ""}
                    </a>
                </Button>
            </Style>
        </Layout>
    )
}


function DonationBanner(props){
    let {onSubmit,onChange} = useDonationBannerHook(props)

    return (
        <section>
            <Form onSubmit={onSubmit}>
                <Input type="number" name="money" defaultValue="3.00" min="1">
                    <BiDollar/>
                </Input>
                
                <Input type="range" name="range" min="1" max="10" defaultValue="3" onChange={onChange}/> 

                <Button primary type="submit">Show the love!</Button>
            </Form>
        </section>
    )
}


function useRootHook(){
    let [url,setUrl] = useState("")
    let [partner,setPartner] = useState(false)
    let axios = useAxios()
    const prepUrl = url => url ? url.split("//")[1].split("/")[0].replace("www.","") : ""

    useEffect(getCurrentTabUrl,[])
    useEffect(getPartners,[]) // eslint-disable-line react-hooks/exhaustive-deps

    function getPartners(){
      if(!url) return

      axios.get("/partners").then(results=>{
        let hostname = new URL(url).hostname
        let partnerBool = results.data.partners.includes(hostname)
        setPartner(partnerBool)
      })
    }

    function getCurrentTabUrl() {
        let chrome = window.chrome 

        if(!chrome["tabs"]){
            setUrl("http://localhost.com")
            return 
        } 
        chrome.tabs.query( { active: true, currentWindow: true }, tabs =>{
            setUrl(tabs[0].url)
        });
    }

    return {
        url,
        partner,
        prepUrl
    }
}


function useDonationBannerHook(props){
    const history = useHistory()
    const context = useContext(Context)
    const axios = useAxios()
  
    function makePayment(values){
        let value = values.money * 100
       
        axios.post("/users/payments",{amount:value,type:"donation",identifier:props.url}).then(({data:result})=>{
            history.push("/paid")
        }).catch(error=>{
          history.push({pathname:"/error",state:{message:error.response.data.message}})
        })   
    }
  
    function onChange(value,form){
        form.setFieldValue("money",value)
    }
  
    function onSubmit(values){
        if(!context.state.user.card){
          history.push("/account")
          return 
        }
  
        makePayment(values)
    }  

    return {
        onChange,
        onSubmit
    }
}


