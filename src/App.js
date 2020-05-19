import React from 'react';
import logo from './logo.png';
import './App.css';

import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home';
import ConfirmPay from './components/confirm-pay';

function App() {
  return (
  
    <div className="App">

      <header className="App-header">

        <img src={logo} className="App-logo"></img>

      </header>

      <body className="App-body"
            style={{backgroundColor: '#35363a'}}
      >
        <Home/>
        <ConfirmPay/>
      </body>

      <footer className="App-footer">
        <h3 color="white">something here about signing up</h3>
      </footer>
      
    </div>
  );
}

export default App;
