import React, {useState} from 'react';
import './donation-banner.css'
import { Button } from 'antd';


function DonationBanner(props) {


    const [value, setValue] = useState(props.balance > 100 ? 100: props.balance)


    const rangeSlide = (event) => {
        setValue(event.target.value)
    }

    const onClick = (event) => {

        if(value == 0)
        {
            alert("Cannot donate $0")
        }
        else
        {

            props.makePayment({'amount': value, 'type':'donation', 'domain': props.url})
            console.log({'amount': value, 'type':'donation', 'domain': props.url})
            props.setScreen()
        }

    }

    return(
        
        <section id="slider">
            <div>
                <span id="rangeValue">{(value/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</span>
                <input 
                class="range"
                type="range" 
                name="" 
                value={value} 
                min="0" 
                max={props.balance > 300? "300": props.balance.toString()}
                onChange={rangeSlide}
                /> 
                <div>
                    <Button size="small" type="danger" shape="round" value={value} onClick={onClick}>Show the love!</Button>
                </div>
            </div>

        </section>



    )

}

export default DonationBanner