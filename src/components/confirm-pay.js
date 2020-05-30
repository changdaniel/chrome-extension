import React from 'react';
import {Button} from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';
import './confirm-pay.css'

function ConfirmPay(props) {

    return(

        <div className = "confirm-span">
            <DollarCircleOutlined />
            <p> Access this article for $.25?</p>
            <Button shape='round' type='danger' onClick={props.progessScreen}>Yes</Button>
            <Button shape='round' type='danger'>No</Button>
        </div>
    )

}

export default ConfirmPay