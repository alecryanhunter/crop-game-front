import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DirectMessage from "./pages/DirectMessage";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Rules from "./pages/Rules";
import Shop from "./pages/Shop";

function App() {
  
  return (
    <Router>
      {/* Persistent Nav Element For Production Purposes */}
      <nav>
        <a href="/">Home Page</a>
        <a href="/rules">The Rules</a>
        <a href="/game">The Game</a>
        <a href="/profile/test_username">A Profile</a>
        <a href="/shop">The Shop</a>
        <a href="/lobby">The Lobby</a>
        <a href="/messages">All Messages</a>
        <a href="/messages/test_username">A Direct Message</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/rules" element={<Rules/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/lobby" element={<Lobby/>}/>
        <Route path="/messages" element={<Messages/>}/>
        <Route path="/messages/:username" element={<DirectMessage/>}/>
      </Routes>
    </Router>
  );
}

export default App;