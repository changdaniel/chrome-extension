import React from 'react'
import {useSlot} from "../util/slot"
import logo from "../assets/inverted-logo.png"
import {Link} from "react-router-dom"

function Header(props){
    let fallback = <Link to="/"><img src={logo} className="App-logo"></img></Link>
    return <header className="App-header">{props.children || fallback}</header>  
}

function Footer(props){
    let fallback = <p>Support your favorite creators!</p>
    return <footer className="App-footer">{props.children || fallback}</footer>
}

function Body(props){
    return <main className="App-body">{props.children}</main>
}

export default function Page({children,id}) {
    children = useSlot(children)

    return (
        <span id={id}>
            <Header>{children.header}</Header>
            <Body>{children.default}</Body>
            <Footer>{children.footer}</Footer>
        </span>
    )
}
