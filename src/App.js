import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Profile from "./pages/Profile";
import DirectMessage from "./pages/DirectMessage";

function App() {

  function getUsername() {

  }
  
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
        <Route path="/" element={<h2>Home Page</h2>}/>
        <Route path="/rules" element={<h2>The Rules</h2>}/>
        <Route path="/game" element={<h2>The Game</h2>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path="/shop" element={<h2>The Shop</h2>}/>
        <Route path="/lobby" element={<h2>The Lobby</h2>}/>
        <Route path="/messages" element={<h2>The Message</h2>}/>
        <Route path="/messages/:username" element={<DirectMessage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
