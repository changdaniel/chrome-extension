import React,{useState,useEffect,useContext} from 'react'
import {useHistory,useLocation} from "react-router"
import {Link} from "react-router-dom"
import {Context} from "../"
import {useAxios} from "../../util"

import "./HomeFooter.scss"

export default function DefaultFooter(){
    const history = useHistory()
    const location = useLocation()
    const context = useContext(Context)
    const axios = useAxios()

    useEffect(()=>{
      if(!context.state.token) return 
      // this flag checks if we have already fetched the balance
      if(context.state.gotBalance) return 

      context.dispatch({type:"SET_GOT_BALANCE",payload:true})
      // get the users active balance
      getBalance()

    })

    // get the users current balance when they login
    function getBalance(){
      axios.get("/users").then(({data:result})=>{
        if(!result.okay){
          history.push({pathname:"/error",state:{message:result.message}})
          return
        }
        context.dispatch({type:"SET_BALANCE",payload:(result.user.balance/100)})
      }).catch(error=>{
        history.push({pathname:"/error",state:{message:error.response.data.message}})
      })
    }

    function logOut(){  
      localStorage.removeItem('token')
      history.push("/login")
    }
  
    const nav = location.pathname != "/home/deposit" ? 
    (<Link to="/home/deposit">Deposit</Link>) : 
    (<Link to="/home">Home</Link>)
  
    return (
      <div className="HomeFooter">
          <div>
            {nav}
          </div>
          <div>
            <b>Balance: ${context.state.balance.toFixed(2)}</b>
          </div>
          <div>
            <a onClick={logOut}>Log out</a>
          </div>
      </div>
    )
}