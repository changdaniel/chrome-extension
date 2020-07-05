import React from 'react';
import logo from '../logo.png'
import '../App.css';

const default_header = <img src={logo} className="App-logo"></img> 
const default_footer = <p>default footer</p>

const Wrapper = (props) => (
    
  <div className="App">
    <header className="App-header">{props.header || default_header}</header>
    <body className="App-body">{props.body}</body>
    <footer className="App-footer">{props.footer || default_footer}</footer>
  </div>
  
);

export default Wrapper;