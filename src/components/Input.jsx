import React,{useEffect} from 'react'
import {mix} from "../util"
import styled,{css} from "styled-components"
import {themeGet} from "@styled-system/theme-get"
import {useField} from "react-form";


const Style = styled.div`
    ${mix.hw("48px","100%")}
    ${mix.row("flex-start","stretch")}
    ${mix.m(4,0)}
    ${mix.children([css`
        ${mix.hw("50%",[3,3])}
        align-self:center;
    `])}

    ${({type})=> type !== "range" ? css`
        border:1px solid ${themeGet("colors.grey.3")};
        border-radius:${themeGet("radii.1")};
    `:""}

    input{        
        ${mix.w(1)}
        flex:1;
    }

    input[type=range]{
        border-radius: ${themeGet("radii.4")};
        background:${themeGet("colors.muted.main")} ;
        box-shadow: ${themeGet("shadows.dark")};
        overflow:hidden;
    }

    input[type=range]::-webkit-slider-thumb{
        ${mix.hw("18px")}
        appearance: none;
        border-radius: ${themeGet("radii.6")};
        background: ${themeGet("colors.primary.main")};
        border: 4px solid #fff;
        box-shadow: ${themeGet("shadows.light")};
    }

    input:hover + pre{
        display:none;
    }

    pre{
        ${mix.pos("bottom","left")}
        ${mix.p(4,5)}
      
        background:#fff;
        border-radius:0 15px 15px 15px;
        border:2px solid ${themeGet("colors.error.main")};
        transform:none;
    }

`

export function Input({children,validate,onChange,defaultValue="",...rest}) {
    let {value, form, meta:{error}, getInputProps} = useField(rest.name,{validate,defaultValue})

    useEffect(()=>{
        if(onChange)
            onChange(value,form)
    },[value])
    
    return (
        <Style {...{...rest}}>
            {children}
            <input {...{...rest}} {...getInputProps()} />
            <pre hidden={!error}><p error="">{error}</p></pre>
        </Style>
    )
}
