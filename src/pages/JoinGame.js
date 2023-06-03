import { useState } from "react";
import io from "socket.io-client";
import Lobby from "../pages/Lobby";
import "../styles/NewGame.css";

export default function JoinGame({socket}) {
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
          <div className="newGameContainer">
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
          <Lobby socket={socket} username={username} room={room}/>
        )}
      </div>
  );
}