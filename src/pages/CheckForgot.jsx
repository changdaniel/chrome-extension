import React from 'react'
import {Layout,Button,Footer} from "../components"
import {Link} from "react-router-dom"
import styled from "styled-components"
import {mix,config} from "../util"


const Style = styled.main`
    ${mix.col()}
    ${mix.p(6)}
    ${mix.gap(4)}
`


export function CheckForgot() {
    return (
        <Layout>
            <Style>
                <h5>A password reset link has been sent to your email.</h5>
                <Link to="/">
                    <Button primary>Okay</Button>
                </Link>
            </Style>
            <Footer slot="footer">
                <p>Contact us : {config.email}</p>
            </Footer>   
        </Layout>
    )
}
