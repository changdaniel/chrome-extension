import React from 'react'
import {Layout,Button,Input,Form} from "../components"
import {Link} from "react-router-dom"
import styled from "styled-components"
import {mix} from "../util"


const Style = styled.main`
    ${mix.col()}
    ${mix.p(7)}
    ${mix.gap(4)}

    
`


export function SuccessMessage() {
    return (
        <Layout>
            <Style>
                <h5>Add a Message</h5>
                <Form>
                    <Input placeholder="Thank you for ...." />
                </Form>
            
                <Link to="/paid">
                    <Button primary>Submit</Button>
                </Link>  
            </Style>
        </Layout>
    )
}
