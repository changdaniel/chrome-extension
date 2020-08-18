
import React from 'react';
import Wrapper from './wrapper';

const Forgot = (props) => {

    return(
        <Wrapper    
         body = {<p>forgot</p>}
         footer = {<p>Remember your password? <a onClick={props.switchPage}>Log In</a></p>}
        />
    )
}
export default Forgot;