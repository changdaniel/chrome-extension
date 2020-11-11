import {MdEmail as EmailIcon} from "react-icons/md"
import {useHistory} from "react-router"
import {Page} from "../../components"
import {useAxios} from "../../util"
import React from 'react'
import {Link} from "react-router-dom"
import "./ForgotPage.scss"

export default function ForgotPage(){
    const history = useHistory()
    const axios = useAxios()

    function onFinish(e){
      e.preventDefault()
      let form = e.target
      let values = {}

      //turn form into json
      form.querySelectorAll("*[name]").forEach(input=>{
        values[input.name] = input.value
      })

      axios.post("/users/forgot_password", values).then(({data:result})=>{
          if(!result.okay){
            history.push({pathname:"/error",state:{message:result.message}})
            return 
          }
          history.push("check-forgot")
      }).catch(error=>{
        history.push({pathname:"/error",state:{message:error.response.data.message}})
      })
    }

    return (
      <Page className="ForgotPage">
     
        <h2>Forgot Password</h2>
        <form onSubmit={onFinish} autoComplete="on">
          <div className="input">
            <EmailIcon></EmailIcon>
            <input type="email" placeholder="Email" name="email" htmlFor="email"/>
          </div>
          <button className="primary">Reset Password</button>
        </form>
       
        <p slot="footer">Remember your password? <Link to="/login">Log In</Link></p>
      </Page>
    )
}