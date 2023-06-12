import React from "react";
import { Lobby } from "boardgame.io/react";
import "../assets/styles/Play.css";

export class CropLobby extends Lobby{
    handleNewMatch(){
        this._createMatch('Cropposition', 2).then(()=> {
            const newestMatchArr = this.connection.matches.slice(-1)
            this.handleJoinMatch(newestMatchArr[0].matchID, "0")
        })
    }
    handleJoinMatch(matchID, playerID){
        this._joinMatch('Cropposition', matchID, `${playerID}`);
    }
    handleLeaveMatch(matchID){
        this._leaveMatch('Cropposition', matchID);
    }
    handleEnterLobby(){
        this._enterLobby(localStorage.getItem("username"));
    }
    handleStartMatch(matchID, playerID){
        console.log({numPlayers: 2, matchID: matchID, playerID: `${playerID}`})
        this._startMatch('Cropposition', {numPlayers: 2, matchID: matchID, playerID: `${playerID}`});
    }

    render(){
        // fetch all running matches
        const allMatchesArr = this.connection.matches;
        let myMatchesArr = [];
        // for each match, find the next empty slot, whether the game is full, and if the current user has already joined
        allMatchesArr.forEach((matchObj, i) => {
            matchObj.roomID = ++i
            const missingPlayerArr = matchObj.players.filter(playerObj => !playerObj.name)
            if (missingPlayerArr.length===0) {
                matchObj.isFull = true
            } else {
                matchObj.fillNextPlayer = missingPlayerArr[0].id
            }   
            const isSelfArr = matchObj.players.filter(playerObj => playerObj.name === this.state.playerName)
            if (isSelfArr.length > 0) { 
                myMatchesArr.push(matchObj) 
                matchObj.myPlayerID = isSelfArr[0].id
            }
        });
        // if the current user has joined a match, show only that match
        if (myMatchesArr.length !== 1) {
            myMatchesArr = allMatchesArr
        };


        // ------------------Page Rendering-------------
        if (this.state.phase === 'enter'){
            this.handleEnterLobby() //this throws a warning, but it works as intended
        }
        else if (this.state.phase === 'list'){
            return (
                <>
                    {myMatchesArr.map((matchObj, i) => {
                        return(
                            <section className="room row" key={matchObj.matchID}>
                                <h3>Room {matchObj.roomID}</h3>
                                <section className="room-details">
                                    <ul className="players col-md-6">
                                        {matchObj.players.map(playerObj => {
                                            return(
                                                <li key={playerObj.id}>
                                                {playerObj.name ? (
                                                    <h4><a href={"/profile/" + playerObj.name} target="_blank">{playerObj.name}</a></h4>
                                                ):(
                                                    <p><i>empty player seat</i></p>
                                                    )}
                                                </li>
                                            )
                                        })}
                                        {matchObj.myPlayerID >= 0 ? (
                                            <button type="button" onClick={() => this.handleLeaveMatch(matchObj.matchID)}>Leave</button>
                                        ):(
                                            <button type="button" onClick={() => this.handleJoinMatch(matchObj.matchID, matchObj.fillNextPlayer )}>Join</button>
                                        )}
                                    </ul>
                                    <div className="play">
                                        {!matchObj.isFull ? 
                                        <p><i>(Waiting for additional players)</i></p>
                                        :null}
                                        {matchObj.isFull && matchObj.myPlayerID >=0  ? (
                                            <button type="button" onClick={() => this.handleStartMatch(matchObj.matchID, matchObj.myPlayerID)}>Play</button>
                                        ):(
                                            null
                                        )}   
                                    </div>
                                </section>      
                            </section> 
                        )
                    })}
                        {(myMatchesArr[0]?.myPlayerID == null) ? (
                            <section className="room row">
                                <button type="button" onClick={() => this.handleNewMatch()}>Host a new game</button>
                            </section>
                        ): null
                        }
                </>
            );
        }
        else if (this.state.phase === 'play'){
            const myGameBoard = React.createElement(this.state.runningMatch.app, {
                matchID: this.state.runningMatch.matchID,
                playerID: this.state.runningMatch.playerID,
                credentials: this.state.runningMatch.credentials
            });
            return (
                <div>
                    {myGameBoard}
                </div>
            );
        }

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
