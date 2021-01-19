import React from 'react'
import {BsFillPersonFill as PersonIcon,BsShieldLockFill as LockIcon} from "react-icons/bs"
import {MdEmail as EmailIcon} from "react-icons/md"
import {useHistory} from "react-router"
import {Link} from "react-router-dom"
import {useAxios,mix} from "../util"
import {Layout,Form,Input,Button,Footer} from "../components"
import styled,{css} from "styled-components"


const Style = styled.main`
	${mix.col()}

    form{
		${mix.col("flex-start","stretch")}
		${mix.w("400px")}

		div{
			${mix.row()}
			
			${mix.children([css`
				${mix.m(0,4,0,0)}
			`
			])}
		}

		button{
			align-self:center;
		}
    }
`


export function Signup() {
    let {onSubmit,validatePassword} = useSignupHook();

    return (
        <Layout>
            <Style>
                <Form onSubmit={onSubmit} autoComplete="on" validate={validatePassword}>

					<div>
						<Input type="text" placeholder="First Name" name="first_name" htmlFor="fname" required>
							<PersonIcon/>
						</Input>

						<Input type="text" placeholder="Last Name" name="last_name" htmlFor="lname" required>
							<PersonIcon/>
						</Input>
					</div>

					<Input type="email" placeholder="Email" name="email" htmlFor="email" required>
						<EmailIcon/>
					</Input>

					<div>
						<Input className="password" type="password" placeholder="Password" name="password" required>
							<LockIcon/>
						</Input>

						<Input type="password" placeholder="Confirm Pass..." name="confirm_password" required>
							<LockIcon/>
						</Input>
					</div>

                    <Button primary type="submit">Sign up</Button>

                </Form>  
            </Style>

            <Footer slot="footer">
				<span>Already have an account?</span> 
				<Button link>
					<Link to="/login">Log in</Link>
				</Button>
            </Footer> 
        </Layout>
    )
}


function useSignupHook(){
    const history = useHistory()
    const axios = useAxios()

    function onSubmit(values){
		console.log(values)
		axios.post("/users",values).then(({data:result})=>{
			history.push("/check-register")
		}).catch(error=>{
			history.push({pathname:"/error",state:{message:error.response.data.message}})
		})
	}
	
	function validatePassword(values){
		let {password,confirm_password} = values

		if(confirm_password !== "" && confirm_password !== password)
			return "passwords do not match"
		return false 
	}

    return {
		onSubmit,
		validatePassword
    }
}
