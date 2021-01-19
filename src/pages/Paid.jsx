import React from 'react'
import {Layout,Button} from "../components"
import {Link} from "react-router-dom"
import styled from "styled-components"
import {mix} from "../util"


const Style = styled.main`
    ${mix.col()}
    ${mix.gap(4)}
`


export function Paid() {
    return (
        <Layout>
            <Style>
                <h5>Thank you!</h5>
                <Link to="/">
                    <Button primary>Back</Button>
                </Link>
            </Style>
        </Layout>
    )
}
