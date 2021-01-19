import React from 'react'
import { useForm } from 'react-form'
import styled from "styled-components"
import {mix} from "../util"
import {themeGet} from "@styled-system/theme-get"


const Style = styled.pre`

    ${mix.pos("top","left")}
    ${mix.p(4,5)}

    background:#fff;
    border-radius:15px 15px 15px 0px;
    border:2px solid ${themeGet("colors.error.main")};
    transform:translate(0,-100%);
    
`


export function Form({onSubmit,children,validate}) {
    let {Form,meta:{error}} = useForm({onSubmit,validate})

    return (
        <Form>
            {children}
            <Style hidden={!error}><p error="">{error}</p></Style>
        </Form>
    )
}



