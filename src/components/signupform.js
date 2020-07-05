import React from 'react';
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

function Signup() {

    const onFinish = values => {
        console.log('Received values of form: ', values);
      };

    return(
        <div className="signup-container">
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}>

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item name = "passwords" >
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
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
            rules={[{ required: true, message: 'Please input your Password!' }]}
            style = {{display:'inline-block', width:'calc(50% - 8px)', margin: '0 8px'}}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
        </Form.Item>
        
  
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