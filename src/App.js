import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { slide as Menu } from 'react-burger-menu'
// import io from "socket.io-client";

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
import "./style.css";

// TEST BOARDGAME.IO STUFF
// =========================
import { Client } from 'boardgame.io/react'
//import { SocketIO } from 'boardgame.io/multiplayer'
import { Local } from 'boardgame.io/multiplayer'
import { CropGame } from './pages/Test'
import { CropGameBoard } from "./pages/TestBoard";

const TestGame = Client({ 
  game: CropGame,
  numPlayers: 2,
  board: CropGameBoard,
  // multiplayer: SocketIO({ server: 'localhost:8000' }),
  multiplayer: Local(),
})

// =========================
// END TEST BOARDGAME.IO STUFF

function App() {

  // const socket = io.connect("http://localhost:3001"); // Local
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
            <Route path="/profile/:user" element={<Profile/>}/>
            {/*}
            <Route path="/lobby" element={<Lobby socket={socket}/>}/>
            <Route path="/game" element={<Game socket={socket} />}/>
            */}
            <Route path="/messages" element={<Messages />}/>
            <Route path="/messages/:friend" element={<DirectMessage />}/>
            <Route path="/search" element={<Search/>}/>
            {/* <Route path="/joinGame" element={<JoinGame socket={socket}/>}/> */}
            <Route path="/play" element={<Play />}/>
            <Route path="/shop" element={<Shop />}/>
            <Route path="/testGame" element={
              <section style={{display: "flex"}}>
                <TestGame playerID="0"/>
                <TestGame playerID="1"/>
              </section >
            } />
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