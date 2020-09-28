import React, {useState} from 'react';
import { Button } from 'antd';
import '../../styles/DonationBanner.scss'
import {useHistory} from "react-router"

export default function(props) {
    const [value, setValue] = useState(props.balance > 300 ? 300: props.balance)
    const history = useHistory()

    const rangeSlide = (event) => {
        let value = event.target.value
        if(event.target.id === "rangeValue"){
            value = Number(value.slice(1)) * 100
        }
        setValue(value)
    }

    const onClick = (event) => {
        props.makePayment(value)
        history.push("/home/paid")
    }

    return(
        
        <section id="slider" id="DonationBanner">
            <div>
                <input id="rangeValue" type="text" onChange={rangeSlide} value={(value/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}/>
                
                <input 
                className="range"
                type="range" 
                name="" 
                min="100" 
                max="1000"
                defaultValue="300"
                onChange={rangeSlide}
                /> 
                <div>
                    <Button size="small" type="danger" shape="round" value={value} onClick={onClick}>Show the love!</Button>
                </div>
            </div>

        </section>
    )

}

