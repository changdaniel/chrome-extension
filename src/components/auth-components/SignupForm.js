import React from 'react';
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';

export default function(props){

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

        <Form.Item name = "names" style={{marginBottom:"0"}}>
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: 'Required' }]}
            style = {{display:'inline-block', width:'calc(50% - 8px)'}}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="First Name"
            />
          </Form.Item>

          <Form.Item
            name="last_name"
            rules={[{ required: true, message: 'Required' }]}
            style = {{display:'inline-block', width:'calc(50% - 8px)', margin: '0 8px'}}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="Last Name"
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item name = "passwords1" style={{marginBottom:"0"}}>
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
        
  
        <Form.Item>
          <Button type="danger" shape="round" htmlType="submit" className="login-form-button">
            Sign Up 
          </Button>
        </Form.Item>
      </Form>
      </div>
    )

}

