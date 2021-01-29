import React from 'react'
import {Layout,Footer} from "../components"
import styled from "styled-components"
import {config,mix} from "../util"


const Style = styled.main`
    ${mix.col()}
`


export function Contact() {
    return (
        <Layout>
            <Style>
                <h5>Contact us at {config.email}</h5>
            </Style>
            <Footer slot="footer">
                <p>Contact us : {config.email}</p>
            </Footer>
        </Layout>
    )
}
