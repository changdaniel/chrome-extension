import React, {useState} from 'react';
import './donation-banner.css'


function DonationBanner(props) {


    const [value, setValue] = useState(100)


    const rangeSlide = (event) => {
        setValue(event.target.value)
    }

    const onClick = (event) => {
        props.makePayment({'amount': value, 'type':'donation', 'business':'rain@google.com'})
        props.setPaid(true)
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
                min="1" 
                max="300" 
                onChange={rangeSlide}
                /> 
                <div>
                    <button value={value} onClick={onClick}>Donate</button>
                </div>
            </div>

        </section>



    )

}

export default DonationBanner