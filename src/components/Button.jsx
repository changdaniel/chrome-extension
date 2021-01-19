import React from 'react'
import styled,{css} from "styled-components"
import {mix} from "../util"
import {themeGet} from "@styled-system/theme-get"


const Style = styled.button`

    ${({primary}) => primary ? css`
        ${mix.h(2)}
        ${mix.p(3,6)}
        background:${themeGet("colors.primary.main")};
        color:white;
        border-radius:${themeGet("radii.4")};

        &:hover{
            background:${themeGet("colors.primary.light")};
        }
    `:""}    
    
    ${({link}) => link ? css`
        font-weight:${themeGet("fontWeights.bold")};
        text-decoration:underline;
    `:""}

`

export function Button({children,onClick,...rest}) {
    return (
        <Style onClick={onClick} {...{...rest}}>
            {children}
        </Style>
    )
}
