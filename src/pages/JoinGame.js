
import { useState } from "react";
import Lobby from "../components/Lobby";
import "../assets/styles/NewGame.css";

export default function JoinGame({socket}) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isHost, setIsHost] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", {username, room});
      setShowChat(true);
    }
  };

  socket.on("join_room_success", ({ host }) => {
    setIsHost(socket.id === host);
  });

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
          <Lobby socket={socket} username={username} room={room} isHost={isHost}/>
        )}
      </div>
  );
}
