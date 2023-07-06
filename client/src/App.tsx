import React from 'react';
import HomePage from './components/Home/Home';
import XSS from './components/Games/xss';
import PasswordCracker from './components/Games/passwordCracker';
import SQLInjectionGame from './components/Games/sql';
// import SQLInjectionGame2 from './components/Games/gg';
import SqlGame from './components/Games/sqlGame';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import SignUpPage from './components/Validation/Signup';
import Home from './components/Home/Home'
import {io} from "socket.io-client"
const socket = io('http://localhost:3001',{ transports: ["websocket"] });
socket.connect()

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<SignUpPage socket={socket}/>}/>
            <Route path="home/:id" element={<Home />} />
            <Route path="game1/:id" element={<XSS socket={socket}/>} />
            <Route path="game2/:id" element={<PasswordCracker />} />
            <Route path="game3/" element={<SqlGame />} />
            {/* <Route path="game4/" element={<SQLInjectionGame />} /> */}
          </Route>   
        </Routes>
      </Router>

    </div>
  );
}

export default App;
