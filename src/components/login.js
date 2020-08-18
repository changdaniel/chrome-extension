import React from 'react';
import Wrapper from './wrapper';
import LoginForm from './loginform';



const Login = (props) => {

    return(
        <Wrapper    
         body = {<LoginForm forgotPassword={props.forgotPassword} loginRequest ={props.loginRequest}/>}
         footer = {<p>Don't have an account? <a onClick={props.switchPage}>Register</a> </p>}
        />
    )
}
export default Login;