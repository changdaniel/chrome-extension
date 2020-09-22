import React from 'react';
import Wrapper from '../Wrapper';
import LoginForm from './LoginForm';

export default function(props) {

    return(
        <Wrapper    
         body = {<LoginForm forgotPassword={props.forgotPassword} loginRequest ={props.loginRequest}/>}
         footer = {<p>Don't have an account? <a onClick={props.switchPage}>Register</a> </p>}
        />
    )
}


