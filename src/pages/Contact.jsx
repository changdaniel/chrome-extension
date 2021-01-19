import React from 'react'
import {Layout} from "../components"
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
        </Layout>
    )
}
