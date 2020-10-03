import React,{useState,useEffect} from 'react'
import {useHistory,useLocation} from "react-router"
import {Link} from "react-router-dom"
import api from "../../util/api"

import "./HomeFooter.scss"

export default function DefaultFooter(){
    const history = useHistory()
    const location = useLocation()
    let [balance,setBalance] = useState(20)

    useEffect(()=>{
      // getUser()
    },[])

    function logOut(){  
      localStorage.removeItem('authenticated')
      localStorage.removeItem('loginToken')
      history.push("/login")
      window.close()
    }

    //get users balance
    function getUser(){
      api.get("/users").then(({data:result})=>{
        if(!result.okay){
          logOut()
          return
        }
        //setBalance(result.user.balance)
      }).catch(error=>{
        history.push({pathname:"/error",state:{message:error.response.data.message}})
      })
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
            <b>Balance: ${balance}</b>
          </div>
          <div>
            <a onClick={logOut}>Log out</a>
          </div>
      </div>
    )
}