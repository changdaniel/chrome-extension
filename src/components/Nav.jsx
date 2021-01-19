import React from 'react'
import {Link} from "react-router-dom"
import logo from "../assets/media/logo-medium.png"
import {mix} from "../util"
import styled from "styled-components"


const Style = styled.nav`
    ${mix.p("4")}
    ${mix.row()}

    a,a img{
        ${mix.w(5)}
    }
`


export function Nav() {
    return (
        <Style>
            <Link to="/">
                <img src={logo} alt=""/>
            </Link>
        </Style>
    )
}
