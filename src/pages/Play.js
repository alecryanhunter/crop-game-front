
import React, { useEffect, useState } from "react";
//import { v4 as uuidv4 } from 'uuid';
import "../assets/styles/NewGame.css";

import { Client } from 'boardgame.io/react'
import { CropGame } from "../components/Game";
import { CropGameBoard } from "../components/Board";
import { SocketIO } from "boardgame.io/multiplayer";
import { Lobby } from "boardgame.io/react";
import { CropLobby } from "../components/Lobby";
import { GAME_SERVER } from "../config";
import Chat from "../components/Chat";

const CropClient = Client({ 
  game: CropGame,
  board: CropGameBoard,
  multiplayer: SocketIO({ GAME_SERVER }),
})


export default function Play({socket}) {

    // const [username, setUsername] = useState("");
    // const [room, setRoom] = useState("");
    // const [showChat, setShowChat] = useState(false);
    // const [host, setHost] = useState("");
    
    // useEffect(() => {
    //     const roomCode = uuidv4().replace(/-/g, '').slice(0, 6).toUpperCase();
    //     setRoom(roomCode);
    //     console.log(roomCode);
    // }, []);
    
    // const joinRoom = () => {
    //   if (username !== "" && room !== "") {
    //     socket.emit("create_room", {username, room});
    //     setShowChat(true);
    //     socket.on("host_registered", ({ host }) => {
    //         setHost(host);
    //     });
    //   }
    // };

    return (
      <>
        <div className="gameChat d-flex justify-content-center align-items-center">
          <CropLobby
            gameServer={GAME_SERVER}
            lobbyServer={GAME_SERVER}
            gameComponents={[{ game: CropGame, board: CropGameBoard }]}
            />
          <Chat socket={socket} />
          {/* {!showChat ? (
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
            )} */}
        </div>
      </>
    );
  }
