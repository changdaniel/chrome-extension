import LoginForm from '../components/auth-components/LoginForm';
import SignupForm from '../components/auth-components/SignupForm';
import {Link} from "react-router-dom"
import React from 'react';
import Page from "../components/Page"

// Forgot page imports
import api from "../api"
import { Form, Input, Button} from 'antd';
import { MailOutlined} from '@ant-design/icons';
import {useHistory} from "react-router"

// Error page imports
import { useLocation } from 'react-router';

//export pages
export {default as Home} from './Home';

export function Login({setLoginToken}){
    return (
      <Page>
        <LoginForm {...{setLoginToken}}/>
        <p slot="footer">Don't have an account? <Link to="/register">Register</Link> </p>
      </Page>  
    )
}

export function Register(){
  return (
    <Page>
      <SignupForm />
      <p slot="footer">Already have an account? <Link to="/login">Login</Link></p>
    </Page>
  )
}

export function Forgot(){
    const history = useHistory()

    function onFinish(values){
      api.post("/auth/forget_password_request", values).then(({data:result})=>{
          if(!result.okay){
            history.push({pathname:"/error",state:{message:result.message}})
            return 
          }
          history.push("check-forgot")
      }).catch(error=>{
        history.push({pathname:"/error",state:{message:error.message}})
      })
    }

    return (
      <Page>
        <div>
            <h2>Forgot Password</h2>
            <Form
            initialValues={{ remember: true }}
            onFinish={onFinish}>
            
                <Form.Item
                  name="email"
                  style= {{marginBottom:"10px"}}
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>

                <Form.Item>
                    <Button type="danger" shape="round" htmlType="submit">
                        Reset Password
                    </Button>
                </Form.Item>

            </Form>
        </div>
        <p slot="footer">Remember your password? <Link to="/login">Log In</Link></p>
      </Page>
    )
}

export function Error(){
  let location = useLocation()

  return (
    <Page>
      <div>
        <p>{location.state.message}</p>
        <Link to="/login" >
          <Button shape="round" type="danger">Go Back</Button>
        </Link>
      </div>
    </Page>
  )
}

export function CheckRegister(){
  return (
    <Page>
      <div>
        <h2 style={{color:'white'}}>Check your email to verify your account.</h2>
        <h3>This window needs to be reopened after verification</h3>
      </div>
    </Page>    
  )
}

export function CheckForgot(){
  return (
    <Page>
      <div>
        <h2 style={{color:'white'}}>Check your email to reset your password.</h2>
      </div>
    </Page>
  )
}