import {BsShieldLockFill as LockIcon} from "react-icons/bs"
import {MdEmail as EmailIcon} from "react-icons/md"
import { useHistory } from 'react-router'
import {Link} from "react-router-dom"
import {useAxios} from "../../util"
import React,{useContext} from 'react'
import {Page,Context} from "../../components"

import "./LoginPage.scss"


function LoginForm() {
    const history = useHistory()
    const context = useContext(Context)
    const axios = useAxios()

    
    async function onFinish(e){
      e.preventDefault()
      let form = e.target
      let values = {}

      //turn form into json
      form.querySelectorAll("*[name]").forEach(input=>{
        values[input.name] = input.value
      })

      //api request
      axios.post("/users/login", values).then(({data:result})=>{
        context.dispatch({type:"SET_TOKEN",payload:result.token})
        localStorage.setItem("token",result.token)
        history.push("/home")

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

          <Link to="/forgot">Forgot password</Link>
          
          <button className="primary" type="submit">Log in</button>

        </form>  
    )

}


export default function LoginPage(){
    return (
      <Page className="LoginPage">
        <LoginForm />
        <p slot="footer">Don't have an account? <Link to="/signup">Sign up</Link> </p>
      </Page>  
    )
}