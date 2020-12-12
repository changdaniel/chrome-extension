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
      // if(context.state.gotBalance) return 

      context.dispatch({type:"SET_GOT_BALANCE",payload:true})
      // get the users active balance
      getUser()

    },[])

    // get user information 
    function getUser(){
      axios.get("/users").then(({data})=>{
        console.log(data.user)
        context.dispatch({type:"SET_USER",payload:data.user})
      }).catch(error=>{
        history.push({pathname:"/error",state:{message:error.response.data.message}})
      })
    }

    function logOut(){  
      localStorage.removeItem('token')
      history.push("/login")
    }
  
    const accountToggle = location.pathname != "/home/deposit" ? 
    (<Link to="/home/deposit">Account</Link>) : 
    (<Link to="/home">Home</Link>)
  
    return (
      <div className="HomeFooter">
          <div>
            {accountToggle}
          </div>
          <div>
            <b>Total: ${(context.state.user.balance/100).toFixed(2)}</b>
          </div>
          <div>
            <a onClick={logOut}>Log out</a>
          </div>
      </div>
    )
}