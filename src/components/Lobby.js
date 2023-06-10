import React, { useEffect, useState } from "react";
import { Lobby } from "boardgame.io/react";
import { GAME_SERVER } from "../config"


import CropGame from "./Game";
import User from "./User";
import Chat from "./Chat";
import "../assets/styles/Lobby.css";

// state.playerName
// state.phase: list, play
// state.runingMatch: {.app, .crendentials, .matchID, .playerID}
// LobbyCreateMatchForm
    // props.games: [{}]
    // state.numPlayer
    // selectedGame
// LobbyMatchInstance

export class CropLobby extends Lobby {
    render() {
        this.state.playerName = localStorage.getItem("username");

        function handleNewMatch () {
            console.log("start a new match");
                fetch(`${GAME_SERVER}/games/Cropposition/create`, {
                    method: "POST",
                    body: JSON.stringify({
                        numPlayers: 2,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then((res)=>{
                    return res.json();
                }).then(json => {
                    console.log(json)
                })
        };
        
        
        return (
            <div>
                 <p>state.phase: {this.state.phase}</p>
                 <p>state.playerName: {this.state.playerName}</p>
                <button type="button" onClick={handleNewMatch}>Host new game</button>
                 <p>connection.matches:</p>
                 {this.connection.matches.map(matchObj => {
                     return (
                        <ul>
                            <li key={matchObj.matchID}>[i].matchID: {matchObj.matchID}</li>
                            <li>[i].players:</li>
                            <ul>
                                {matchObj.players.map(playerObj => {
                                    return(
                                        <li>{playerObj.id}:{playerObj.name}</li>
                                    )
                                })}
                            </ul>
                        </ul>
                     )
                 })}

            </div>
        );
      }
    

}

// function Lobby({socket, room, username, host }) {
//     const [players, setPlayers] = useState([]);
//     const [preGame, setPreGame] = useState(true)

//     const isHost = socket.id === host;
//     const canStartGame = isHost && !room.gameStarted;

//     const startGame = () => {
//         if(canStartGame) {
//             socket.emit("start_game", room);
//             setPreGame(false);
//         }
//     };

//     useEffect(() => {
//         socket.on("players_updated", (updatedPlayers) => {
//             setPlayers(updatedPlayers);
//         });

//         socket.on("game_started", () => {
//             setPreGame(false);
//         });

//         return () => {
//           socket.off("players_updated");
//           socket.off("game_started");
//         };
//       }, [socket]);

//     useEffect(() => {
//         if (!preGame && room.gameStarted) {
//           setPreGame(false);
//         }
//     }, [preGame, room]);

//     return (
//         <div className="pregame">
//             {preGame ? (
//             <section className="page">
//                 <h2>Lobby</h2>
//                 <section className="subpage lobby">
//                     <h3>Lobby Code: {room}</h3>
//                     {canStartGame && (
//                         <button className="startGameBtn" onClick={startGame}>Start Game</button>
//                     )}
//                     {players.length > 0 && players.map((player) => (
//                         <div className="joiningPlayers" key={player.id}>
//                             <User 
//                             username={player.username} 
//                             title="test_title" 
//                             />
//                         </div>
//                     ))}
//                     <section className="chat">
//                         <Chat socket={socket} username={username} room={room}/>
//                     </section>
//                 </section>
//             </section>
//             ) : (
//                 <></>
//                 // <Game socket={socket} username={username} players={players} room={room} isHost={isHost} host={host} />
//             )}
//         </div>
//     )
// }

// export default Lobby;
