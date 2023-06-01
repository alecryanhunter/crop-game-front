import { useState } from "react";
import io from "socket.io-client";
import Chat from "../components/Chat.js";
import "../styles/Chat.css";

const socket = io.connect("http://localhost:5678");

export default function GameChat() {
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
      <div className="gameChat">
        {!showChat ? (
          <div className="joinChatContainer">
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
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
  );
}