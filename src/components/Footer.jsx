import React,{useEffect,useContext} from 'react'
import {useHistory,useLocation} from "react-router"
import {Link} from "react-router-dom"
import {Context,Button} from "./"
import {useAxios,mix} from "../util"
import styled from "styled-components"
import {themeGet} from "@styled-system/theme-get"


const Style = styled.footer`
    ${mix.h(3)}
    ${mix.p(0,4)}
    ${mix.row("center","center")}
    ${mix.gap(5)}

    background:${themeGet("colors.muted.main")}
`


export function Footer({children}) {
    let {accountToggle,balance,logOut} = useFooterHook()

    if(children){
        return (
            <Style>{children}</Style>
        )
    }

    return (
        <Style>
            {accountToggle}
            <b>Total: ${balance}</b>
            <Button link onClick={logOut}>Log out</Button>
        </Style>
    )
}


function useFooterHook(){
    const history = useHistory()
    const location = useLocation()
    const context = useContext(Context)
    const axios = useAxios()

    useEffect(getUserBalance,[]) // eslint-disable-line react-hooks/exhaustive-deps

    function getUser(){
        axios.get("/users").then(({data})=>{
            context.dispatch(state=>{
                state.user=data.user
                return state
            })
        }).catch(error=>{
            localStorage.removeItem('token')
            history.push({pathname:"/error",state:{message:error.response.data.message}})
        })
    }

    function logOut(){  
        localStorage.removeItem('token')
        history.push("/login")
    }

    function getUserBalance(){
        if(!context.state.token)
            return 

        context.dispatch(state=>{
            state.gotBalance = true
            return state
        })
        getUser()
    }

    const accountToggle = location.pathname !== "/account" ? 
    (<Button link><Link to="/account">Account</Link></Button>) : 
    (<Button link><Link to="/">Home</Link></Button>)

    let balance = context.state.user ? (context.state.user.balance/100).toFixed(2) : 0

    return {
        balance,
        accountToggle,
        logOut
    }
}