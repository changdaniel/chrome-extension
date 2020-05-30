import React, {useState} from 'react';
import logo from './logo.png';
import './App.css';
// import { Layout} from 'antd';

// const { Header, Content, Footer } = Layout;
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home'; 
import ConfirmPay from './components/confirm-pay';

const Wrapper = (props) => (
  <div class="App">
    <header className="App-header">{props.header}</header>
    <body className="App-body">{props.body}</body>
    <footer className="App-footer">{props.footer}</footer>
  </div>
  
);

const App = () => {

  const [screen, setScreen] = useState(0)
  const progessScreen = () => setScreen(screen  + 1)
  const header = <img src={logo} className="App-logo"></img> 

  let body;
  let footer;

  if(screen == 0){
    body = <Login onClick={progessScreen}/>
    footer = <h3 color="white">Something Here About Logging In</h3>
  }
  else if (screen == 1){
    body = <div><Home/><ConfirmPay onClick={progessScreen}/></div>
    footer = <h3 color="white">Something Here about Confirming</h3>
 
  }
  else if (screen == 2) {
    body = <Home/>
    footer = <h3 color="white">Something Here about Balance</h3>
  }

  return(
  <Wrapper
    header = {header}
    body = {body}
    footer = {footer}
    />
  )

}
  

export default App;
