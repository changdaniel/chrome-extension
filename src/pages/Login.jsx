import {BsShieldLockFill as LockIcon} from "react-icons/bs"
import {MdEmail as EmailIcon} from "react-icons/md"
import { useHistory } from 'react-router'
import {Link} from "react-router-dom"
import {useAxios,mix} from "../util"
import React,{useContext} from 'react'
import {Layout,Context,Button,Footer,Form,Input} from "../components"
import styled from "styled-components"


const Style = styled.main`
    ${mix.col()}
    ${mix.p(6)}

    form{
        ${mix.col()}
        ${mix.gap(4)}
        ${mix.w("400px")}
    }
`


export function Login() {
    let {onSubmit} = useLoginHook()
    
    return (
        <Layout>
            <Style>
                <Form onSubmit={onSubmit} autoComplete="on">
                    <Input type="email" name="email" placeholder="Email" required>
                        <EmailIcon/>
                    </Input>

                    <Input type="password" name="password" placeholder="Password" required>
                        <LockIcon/>
                    </Input>

                    <Button link>
                        <Link to="/forgot">Forgot password</Link>
                    </Button>

                    <Button primary type="submit">Log in</Button>
                </Form>  
            </Style>

            <Footer slot="footer">
                Don't have an account?
                <Button link>
                    <Link to="/signup">Sign up</Link>
                </Button>
            </Footer>
        </Layout>
    )
}


function useLoginHook(){
    const history = useHistory()
    const context = useContext(Context)
    const axios = useAxios()

    function onSubmit(values){
        
        axios.post("/users/login", values).then(({data:result})=>{
          context.dispatch(state=>{
              state.token = result.token
              return state
          })
          localStorage.setItem("token",result.token)
          history.push("/")
  
        }).catch(error=>{
          history.push({pathname:"/error",state:{message:error.response.data.message}})
        })
  
      }

      return {
        onSubmit
      }
}
