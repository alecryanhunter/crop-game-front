import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DirectMessage from "./pages/DirectMessage";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Rules from "./pages/Rules";
import Shop from "./pages/Shop";
import Search from "./pages/Search"
import Header from "./components/Header";
import "./style.css";

function App() {
  
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/rules" element={<Rules/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/lobby" element={<Lobby/>}/>
        <Route path="/messages" element={<Messages/>}/>
        <Route path="/messages/:username" element={<DirectMessage/>}/>
        <Route path="/search/:username" element={<Search/>}/>
      </Routes>
    </Router>
  );
}

export default App;