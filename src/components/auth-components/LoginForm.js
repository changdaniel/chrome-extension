import React from 'react';
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom"
import { useHistory } from 'react-router';
import api from "../../api"

export default function ({setLoginToken}) {
    let history = useHistory()

    async function onFinish(values){
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

    return(
        <div className="signup-container">
          <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}>    

          <Form.Item  
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          
          <Form.Item>
            <Link to="/forgot" className="login-form-forgot">
              Forgot password
            </Link>
          </Form.Item>
    
          <Form.Item>
           
              <Button type="danger" shape="round" htmlType="submit" className="login-form-button">
                Log in
              </Button>
     
          </Form.Item>
        </Form>
      </div>
    )

}

