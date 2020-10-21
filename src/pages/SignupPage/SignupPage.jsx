import {BsFillPersonFill as PersonIcon,BsShieldLockFill as LockIcon} from "react-icons/bs"
import {MdEmail as EmailIcon} from "react-icons/md"
import {useHistory} from "react-router"
import {Link} from "react-router-dom"
import {useAxios} from "../../util"
import React from 'react'
import {Page} from "../../components"

import "./SignupPage.scss"

function SignupForm(){
    const history = useHistory()
    const axios = useAxios()

    function onSubmit(e){
      e.persist()
      let form = e.target.parentNode
      let values = {}

      //turn form into json
      form.querySelectorAll("*[name]").forEach(input=>{
        values[input.name] = input.value
      })

      //make sure passwords match 
      form.querySelector(".password").setCustomValidity("") //reset message every submit 
      if(values["password"] !== values["confirm_password"]){
        form.querySelector(".password").setCustomValidity("Your passwords do not match.")
      }

      //check form validity (usually this is done onSubmit, but im using onClick)
      form.reportValidity()
      for(let input of form.querySelectorAll("input")){
        if(!input.checkValidity()) return 
      }

      //api request
      axios.post("/auth/register",values).then(({data:result})=>{
          if(!result.okay){
            history.push({pathname:"/error",state:{message:result.message}})
            return
          }
          // localStorage.setItem("token",result.token)
          history.push("/check-register")
      }).catch(error=>{
        history.push({pathname:"/error",state:{message:error.response.data.message}})
      })
    }

    return (
      <form className="SignupForm" onSubmit={e=>e.preventDefault()} autoComplete="on">
        
        <div className="input half">
          <PersonIcon></PersonIcon>
          <input type="text" placeholder="First Name" name="first_name" htmlFor="fname" required/>
        </div>

        <div className="input half">
          <PersonIcon></PersonIcon>
          <input type="text" placeholder="Last Name" name="last_name" htmlFor="lname" required/>
        </div>

        <div className="input full">
          <EmailIcon></EmailIcon>
          <input type="email" placeholder="Email" name="email" htmlFor="email" required />
        </div>

        <div className="input half">
          <LockIcon></LockIcon>
          <input className="password" type="password" placeholder="Password" name="password" required/>
        </div>

        <div className="input half">
          <LockIcon></LockIcon>
          <input type="password" placeholder="Confirm Pass..." name="confirm_password" required/>
        </div>

        <button className="primary" onClick={onSubmit}>Signup</button>
      </form>  
    )

}

export default function SignupPage(){
    return (
      <Page className="SignupPage">
        <SignupForm />
        <p slot="footer">Already have an account? <Link to="/login">Login</Link></p>
      </Page>
    )
  }