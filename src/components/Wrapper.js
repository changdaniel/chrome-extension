import React from 'react';
import logo from '../assets/inverted-logo.png'

const default_header = <img src={logo} className="App-logo"></img> 
const default_footer = <p>Support your favorite creators!</p>

export default function(props){
  
  return (
    <div className="App">
      <header className="App-header">{props.header || default_header}</header>
      <main className="App-body">{props.body}</main>
      <footer className="App-footer">{props.footer || default_footer}</footer>
    </div>
  )
}

