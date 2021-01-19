import React from 'react'
import {MdEmail as EmailIcon} from "react-icons/md"
import {useHistory} from "react-router"
import {Layout,Form,Input,Button,Footer} from "../components"
import {useAxios,mix} from "../util"
import {Link} from "react-router-dom"
import styled from "styled-components"


const Style = styled.main`
    ${mix.col()}
    ${mix.gap(4)}

    form{
        ${mix.col()}

        input{
            width:250px;
        }
    }
`


export function Forgot() {
    let {onSubmit} = useFogotHook()

    return (
        <Layout>
            <Style>
                <h5>Forgot Password</h5>
                <Form onSubmit={onSubmit} autoComplete="on">
                    <Input type="email" placeholder="Email" name="email" htmlFor="email">
                        <EmailIcon/>
                    </Input>

                    <Button primary type="submit">Reset Password</Button>
                </Form>
            </Style>

            <Footer slot="footer">Remember your password? <Button link><Link to="/login">Log In</Link></Button></Footer>    
        </Layout>
    )
}


function useFogotHook(){
    const history = useHistory()
    const axios = useAxios()

    function onSubmit(values){
      axios.post("/users/forgot_password", values).then(({data:result})=>{
          history.push("check-forgot")
      }).catch(error=>{
        history.push({pathname:"/error",state:{message:error.response.data.message}})
      })
    }

    return {
        onSubmit
    }
}
