
import React from 'react';
import Wrapper from '../wrapper';
import SignupForm from './signupform';


const Signup = (props) => {

    return(
        <Wrapper
        body = {<SignupForm registerRequest={props.registerRequest}/>}
        footer = {<p>Already have an account? <a onClick={props.switchPage}>Login</a></p>}
        />
    )

}
export default Signup;