
import React, { useEffect, useState } from "react";
import Lobby from "../pages/Lobby";
import { v4 as uuidv4 } from 'uuid';
import "../styles/NewGame.css";


export default function HostGame({socket}) {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [host, setHost] = useState("");
    
    useEffect(() => {
        const roomCode = uuidv4().replace(/-/g, '').slice(0, 6).toUpperCase();
        setRoom(roomCode);
        console.log(roomCode);
    }, []);
    
    const joinRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("create_room", {username, room});
        setShowChat(true);
        socket.on("host_registered", ({ host }) => {
            setHost(host);
        });
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
                value={room}
                readOnly
              />
              <button onClick={joinRoom}>New Game</button>
            </div>
          ) : (
            <Lobby socket={socket} username={username} room={room} host={host}/>
          )}
        </div>
    );
  }
