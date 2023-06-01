import { useState } from "react";
import io from "socket.io-client";
import Chat from "../components/Chat.js";
import Lobby from "../pages/Lobby";
import "../styles/Chat.css";

const socket = io.connect("http://localhost:3001");

export default function JoinGame(props) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
      <div className="gameChat d-flex justify-content-center align-items-center">
        {!showChat ? (
          <div className="joinGameContainer">
            <input
              type="text"
              placeholder="Name"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID #"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join Game</button>
          </div>
        ) : (
          // evenetually will just go to lobby then game
          <Lobby socket={socket} username={username} room={room}/>
        )}
      </div>
  );
}

/* 
          <Chat socket={socket} username={username} room={room} />

*/