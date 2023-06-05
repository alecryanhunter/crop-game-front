import React, { useEffect, useState } from "react";
import User from "../components/User";
import Chat from "../components/Chat";
import "../styles/Lobby.css";


function Lobby({socket, room, username, host}) {
    const [players, setPlayers] = useState([]);

    const isHost = socket.id === host;
    const canStartGame = isHost && !room.gameStarted;

    const startGame = () => {
        if(canStartGame) {
            socket.emit("start_game", room);
        }
    };

    useEffect(() => {
        socket.on("navigate_to_game", () => {
          window.location.href = "/game";
        });

        socket.on("players_updated", (updatedPlayers) => {
            setPlayers(updatedPlayers);
        });

        return () => {
          socket.off("navigate_to_game");
          socket.off("players_updated");
        };
      }, [socket]);

    return (
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
    )
}

export default Lobby;
