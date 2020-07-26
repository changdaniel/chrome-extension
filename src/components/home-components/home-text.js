import React from 'react'


const HomeText = (props) =>
{

    return(

        <div>
            <h3 style={{color:"white"}}>
                Hi, {props.email}
            </h3>
            <h3 style={{color:"white"}}>
                Your account balance:
            </h3>
            <h2 style={{color:"white"}}>
                <strong>{(props.balance/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</strong>
            </h2>
        </div>
    )

}

export default HomeText