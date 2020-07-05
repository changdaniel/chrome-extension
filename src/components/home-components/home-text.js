import React from 'react'
import './home-text.css'


const HomeText = (props) =>
{

    return(

        <div>
            <h3 className = "home-text">
                Hi, Daniel
            </h3>
            <h3 className = "home-text">
                Your account balance:
            </h3>
            <h2 className = "home-text">
                <strong>{(props.balance/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</strong>
            </h2>
        </div>
    )

}

export default HomeText