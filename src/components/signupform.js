import React from 'react';
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

function Signup(props) {

    const onFinish = values => {
        console.log('Received values of form: ', values);
        props.registerRequest(values)
      };

    return(
        <div className="signup-container">
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item name = "passwords" >
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style = {{display:'inline-block', width:'calc(50% - 8px)'}}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm-password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style = {{display:'inline-block', width:'calc(50% - 8px)', paddingBottom:'-10px', margin: '0 8px'}}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
        </Form.Item>
        
        <div style={{marginBottom:"-20px", paddingBottom:"-20px"}}>
        <Form.Item name = "passwords" >
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style = {{display:'inline-block', width:'calc(50% - 8px)'}}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm-password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style = {{display:'inline-block', width:'calc(50% - 8px)', margin: '0 8px'}}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
        </Form.Item>
        </div>
  
        <Form.Item>
          <Button type="danger" shape="round" htmlType="submit" className="login-form-button">
            Sign Up 
          </Button>
        </Form.Item>
      </Form>
      </div>
    )

}

export default Signup