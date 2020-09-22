import React from 'react';
import Wrapper from '../Wrapper';
import SignupForm from './SignupForm';

export default function(props){

    return(
        <Wrapper
        body = {<SignupForm registerRequest={props.registerRequest}/>}
        footer = {<p>Already have an account? <a onClick={props.switchPage}>Login</a></p>}
        />
    )

}
