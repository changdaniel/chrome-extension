import React, {useState}  from 'react'
import { InputNumber, Button} from 'antd';

const TopUp = (props) =>
{

    const [value, setValue] = useState(500)

    return(
        <div>
            <h3 style={{color:"white", marginBottom:"20px"}}>
                How much would you like to top up?
            </h3>
            <InputNumber
                style={{marginBottom:"20px"}}
                defaultValue={value}
                min = {500}
                size="medium"
                formatter={value => `${(value/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}`}
                parser={value => value.replace(/\D+/, '').replace(/[^\d.]+/, '').replace(/[^\d,]/,"")}
                onChange={setValue}
                />
            <div>
            <Button type="danger" shape="round" onClick={() => props.makeDeposit(value)}>
                Finish payment
            </Button>
            </div>
        </div>
    )

}

export default TopUp 