import React from 'react';
import Wrapper from './wrapper';
import LoginForm from './loginform';



const Login = (props) => {

    const switchPage = () => {
        props.switchPage(false)
    }

    return(
        <Wrapper
         body = {<LoginForm loginRequest ={props.loginRequest}/>}
         footer = {<p>Don't have an account? <a onClick={switchPage}>Register</a></p>}
        />
    )
}
export default Login;