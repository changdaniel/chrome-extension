import React,{useState,useEffect} from 'react'
import {BiDollar} from "react-icons/bi"

import "./InputMoney.scss"

//props.min is not handled yet
export default function InputMoney(props) {
    let [money,setMoney] = useState((props.default/100) || 0)

    useEffect(()=>{
        if(props.value)
            setMoney(props.value/100)
    },[props.value])

    function onChange(e){
        let value = Number(e.target.value)
        props.onChange(Math.floor(value * 100))
        setMoney(value)
    }

    return (
        <div className='InputMoney'>
            <BiDollar></BiDollar>
            <input onChange={onChange} type="number"  placeholder="3.00" value={money}/>
        </div>
    )
}
