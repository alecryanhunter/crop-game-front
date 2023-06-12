import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import API from "./utils/API"
import io from "socket.io-client";

import DirectMessage from "./pages/DirectMessage";
import Home from "./pages/Home";
// import Lobby from "./components/Lobby";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Rules from "./pages/Rules";
import Shop from "./pages/Shop";
import Search from "./pages/Search"
import Play from "./pages/Play";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import "./assets/styles/style.css";

// DEVELOPMENT BOARDGAME.IO STUFF
// =========================
import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Local } from 'boardgame.io/multiplayer'
import { CropGame } from './components/Game'
import { CropGameBoard } from "./components/Board";

const Game = Client({ 
  game: CropGame,
  numPlayers: 2,
  board: CropGameBoard,
  multiplayer: Local(),
})

// =========================
// END DEVELOPMENT BOARDGAME.IO STUFF

function App() {

  const socket = io.connect("http://localhost:3001"); // Local
  // const socket = io.connect("https://cropposition-socket.herokuapp.com"); // Deploy

  const [loggedIn, setLoggedIn] = useState(false)


  async function tokenCheck(token, curUser) {
    return await API.verifyToken(token, curUser)
  }

  // Checks if user is logged in on page load
  useEffect(()=>{
    const token = localStorage.getItem("token");
    const curUser = localStorage.getItem("username");
    if(token && curUser) {
      tokenCheck(token, curUser).then(status => {
        if (status) {
          setLoggedIn(status);
          return;
        }
      });
    } else if (window.location.pathname !== "/") {
      window.location.href="/"
    }
  },[])
  
  return (
    <div id="outer-container">
      <div id="page-wrap">
        <Router>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            {/* PATHS */}
            <Route path="/" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
            <Route path="/rules" element={<Rules/>}/>
            <Route path="/profile/:user" element={<Profile/>}/>
            <Route path="/messages" element={<Messages />}/>
            <Route path="/messages/:friend" element={<DirectMessage />}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/play" element={<Play socket={socket} /> }/>
            <Route path="/shop" element={<Shop />}/>

            {/* DEVELOPMENT GAME */}
            {/* <Route path="/game" element={
              <section style={{display: "flex"}}>
                <Game playerID="0"/>
                <Game playerID="1"/>
              </section >
            } /> */}

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;