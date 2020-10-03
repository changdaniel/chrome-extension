import {BsShieldLockFill as LockIcon} from "react-icons/bs"
import {MdEmail as EmailIcon} from "react-icons/md"
import { useHistory } from 'react-router'
import {Link} from "react-router-dom"
import api from "../../util/api"
import React from 'react'
import {Page} from "../../components"

import "./LoginPage.scss"


function LoginForm({setLoginToken}) {
    const history = useHistory()

    async function onFinish(e){
      e.preventDefault()
      let form = e.target
      let values = {}

      //turn form into json
      form.querySelectorAll("*[name]").forEach(input=>{
        values[input.name] = input.value
      })

      //api request
      api.post("/auth/login", values).then(({data:result})=>{
        if(!result.okay){
          history.push({pathname:"/error",state:{message:result.message}})
          return 
        }
            
        setLoginToken(result.token)
        localStorage.setItem("loginToken",result.token)
        history.push("/")

      }).catch(error=>{
        history.push({pathname:"/error",state:{message:error.response.data.message}})
      })

    }

    return (
        <form className="LoginForm" onSubmit={onFinish} autoComplete="on">

          <div className="input">
            <EmailIcon></EmailIcon>
            <input type="email" name="email" htmlFor="email" placeholder="Email" required/>
          </div>

          <div className="input">
            <LockIcon></LockIcon>
            <input type="password" name="password" htmlFor="password" placeholder="Password" required/>
          </div>

          <button className="primary" type="submit">Login</button>

          <Link to="/forgot">Forgot password</Link>
        </form>  
    )

}


export default function LoginPage({setLoginToken}){
    return (
      <Page className="LoginPage">
        <LoginForm {...{setLoginToken}}/>
        <p slot="footer">Don't have an account? <Link to="/signup">Signup</Link> </p>
      </Page>  
    )
}