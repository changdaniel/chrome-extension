import React, {useState} from 'react';
import './donation-banner.css'


function DonationBanner(props) {


    const [value, setValue] = useState(0)


    const rangeSlide = (event) => {
        setValue(event.target.value)
    }

    return(
        
        <section id="donate">
            <p>Donate to </p>
            <div>
                <span id="rangeValue">{value}</span>
                <input 
                class="range"
                type="range" 
                name="" 
                value={value} 
                min="0" 
                max="10" 
                onChange={rangeSlide}
                /> 
                <div>
                    <button>Donate</button>
                </div>
            </div>

        </section>



    )

}

export default DonationBanner