import React, { useEffect, useState } from "react";
import Game from "./Game";
import User from "./User";
import Chat from "./Chat";
import "../assets/styles/Lobby.css";


function Lobby({socket, room, username, host }) {
    const [players, setPlayers] = useState([]);
    const [preGame, setPreGame] = useState(true)

    const isHost = socket.id === host;
    const canStartGame = isHost && !room.gameStarted;

    const startGame = () => {
        if(canStartGame) {
            socket.emit("start_game", room);
            setPreGame(false);
        }
    };

    useEffect(() => {
        socket.on("players_updated", (updatedPlayers) => {
            setPlayers(updatedPlayers);
        });

        socket.on("game_started", () => {
            setPreGame(false);
        });

        return () => {
          socket.off("players_updated");
          socket.off("game_started");
        };
      }, [socket]);

    useEffect(() => {
        if (!preGame && room.gameStarted) {
          setPreGame(false);
        }
    }, [preGame, room]);

    return (
        <div className="pregame">
            {preGame ? (
            <section className="page">
                <h2>Lobby</h2>
                <section className="subpage lobby">
                    <h3>Lobby Code: {room}</h3>
                    {canStartGame && (
                        <button className="startGameBtn" onClick={startGame}>Start Game</button>
                    )}
                    {players.length > 0 && players.map((player) => (
                        <div className="joiningPlayers" key={player.id}>
                            <User 
                            username={player.username} 
                            title="test_title" 
                            />
                        </div>
                    ))}
                    <section className="chat">
                        <Chat socket={socket} username={username} room={room}/>
                    </section>
                </section>
            </section>
            ) : (
                <Game socket={socket} username={username} players={players} room={room} isHost={isHost} host={host} />
            )}
        </div>
    )
}

export default Lobby;
