import React from 'react'
import {useSlot} from "../util/slot"
import logo from "../assets/inverted-logo.png"

function Header(props){
    let fallback = <img src={logo} className="App-logo"></img>
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
