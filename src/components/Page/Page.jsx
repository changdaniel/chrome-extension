import React from 'react'
import {useSlot} from "../../util/slot"
import logo from "../../assets/inverted-logo.png"
import {Link} from "react-router-dom"

import "./Page.scss"

function Header(props){
    let fallback = <Link to="/"><img src={logo} className="App-logo"></img></Link>
    return <header className="Header">{props.children || fallback}</header>  
}

function Footer(props){
    let fallback = <p>Support your favorite creators!</p>
    return <footer className="Footer">{props.children || fallback}</footer>
}

function Body(props){
    return <main className="Body">{props.children}</main>
}

export default function Page({children,className}) {
    children = useSlot(children)

    return (
        <section className={`Page ${className}`}>
            <Header>{children.header}</Header>
            <Body>{children.default}</Body>
            <Footer>{children.footer}</Footer>
        </section>
    )
}
