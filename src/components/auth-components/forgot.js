
import React from 'react';
import Wrapper from '../wrapper';
import { Form, Input, Button} from 'antd';
import { MailOutlined} from '@ant-design/icons';

const Forgot = (props) => {


    return(
        <Wrapper    
            body = {
            <div>
                <h2>Forgot Password</h2>
                <Form
                initialValues={{ remember: true }}
                onFinish={props.forgotPasswordRequest}>
                
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
            </div>}
            footer = {<p>Remember your password? <a onClick={props.switchPage}>Log In</a></p>}
        />
    )
}
export default Forgot;