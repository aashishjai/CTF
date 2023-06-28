import React from 'react';
import HomePage from './components/Home/Home';
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
          </Route>   
        </Routes>
      </Router>

    </div>
  );
}

export default App;
