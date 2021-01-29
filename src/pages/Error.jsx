import React from 'react'
import { useLocation } from 'react-router';
import {Link} from "react-router-dom"
import {Layout,Button,Footer} from "../components"
import {config,mix} from "../util"
import styled from "styled-components"


const Style = styled.main`
    ${mix.col()}
    ${mix.p(6)}
    ${mix.gap(4)}
` 


export function Error() {
    let location = useLocation()

    return (
        <Layout>
            <Style>
                <h5>Error</h5>
                <p>{location.state.message || `A server error has occurred. If this persists please contact us at ${config.email}`}</p>
                <Link to="/" >
                    <Button primary>Go back</Button>
                </Link>
            </Style>
            <Footer slot="footer">
                <p>Contact us : {config.email}</p>
            </Footer>
        </Layout>
    )
}
