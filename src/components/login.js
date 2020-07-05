import React from 'react';
import Wrapper from './wrapper';
import LoginForm from './loginform';


const Login = (props) => (

    <Wrapper
     body = {<LoginForm loginRequest ={props.loginRequest}/>}
    />

)
export default Login;