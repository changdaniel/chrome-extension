
import React from 'react';
import Wrapper from './wrapper';
import SignupForm from './signupform';


const Signup = (props) => {

    const switchPage = () => {
        props.switchPage(true)
    }

    return(
        <Wrapper
        body = {<SignupForm registerRequest={props.registerRequest}/>}
        footer = {<p>Already have an account? <a onClick={switchPage}>Login</a></p>}
        />
    )

}
export default Signup;