import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
import io from "socket.io-client";

import DirectMessage from "./pages/DirectMessage";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Rules from "./pages/Rules";
import Shop from "./pages/Shop";
import Search from "./pages/Search"
import JoinGame from "./pages/JoinGame";
import HostGame from "./pages/HostGame";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import "./style.css";

function App() {

  const socket = io.connect("http://localhost:3001"); // Local
  //const socket = io.connect("https://cropposition-socket.herokuapp.com"); // Deploy

  const [loggedIn,setLoggedIn] = useState(false)

  // Checks if user is logged in on page load
  useEffect(()=>{
    if(localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  },[])
  
  return (
    <div id="outer-container">
      <div id="page-wrap">
        <Router>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            <Route path="/" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
            <Route path="/rules" element={<Rules/>}/>
            <Route path="/game" element={<Game socket={socket} />}/>
            <Route path="/profile/:user" element={<Profile/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/lobby" element={<Lobby socket={socket}/>}/>
            <Route path="/messages" element={<Messages />}/>
            <Route path="/messages/:friend" element={<DirectMessage />}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/joinGame" element={<JoinGame socket={socket}/>}/>
            <Route path="/hostGame" element={<HostGame socket={socket}/>}/>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
      {/* <Menu right pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
        
      </Menu> */}
    </div>
  );
}

export default App;