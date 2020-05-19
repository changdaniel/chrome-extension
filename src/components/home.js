import React from 'react';
import 'antd/dist/antd.css';
import './home.css'

function Home() {

    return(

        <div className = "home-container">
            <h3 className = "home-text">
                Hi [first name]
            </h3>
            <h3 className = "home-text">
                Your account balance:
            </h3>
            <h2 className = "home-text">
                <strong>$1.00</strong>
            </h2>
        </div>
    )

}

export default Home