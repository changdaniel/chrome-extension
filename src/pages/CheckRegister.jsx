import React from 'react'
import {Link} from "react-router-dom"
import {config} from "../util"
import {Layout,Button,Footer} from "../components"
import styled from "styled-components"
import {mix} from "../util"
import {themeGet} from "@styled-system/theme-get"


const Style = styled.main`
    ${mix.col()}
    ${mix.p(6)}
    ${mix.gap(4)}

    span{
        color:${themeGet("colors.grey.8")};
    }
`


export function CheckRegister() {
    return (
        <Layout>
            <Style>
                <p>We’ve sent you a confirmation email. Please confirm your account then log in.</p>
                <Link to="/">
                    <Button primary>Log in</Button>
                </Link>
                <span>Can’t find the email? Please check your promotions folder.</span>   
            </Style>

            <Footer slot="footer">
                <p>Contact us : {config.email}</p>
            </Footer>
        </Layout>
    )
}
