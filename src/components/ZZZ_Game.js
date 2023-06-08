import React , {useEffect, useState} from "react";
import Board from "./ZZZ_Board";
import Tile from "./Tile";
import Chat from "./Chat";
import helpers from "../utils/helpers";

function Game({ socket, room, username, isHost, players }) {

    console.log(socket);
    console.log("ROOM:", room);
    console.log("USERNAME:", username);
    console.log("HOST:", isHost);


    const [started, setStarted] = useState(false)
    // Each tile is an object with a key called "edges", which is an array with 4 items
    const [board, setBoard] = useState(helpers.boardGen(5,5,()=>({edges:[]})));
    const [turn, setTurn] = useState();
    const [redScore, setRedScore] = useState(0);
    const [blueScore, setBlueScore] = useState(0);
    const [active, setActive] = useState({edges:helpers.tileGen(players.length)});
    const [playerRed, setPlayerRed] = useState();
    const [playerBlue, setPlayerBlue] = useState();

    // Handles tile clicks
    function handleTile(e) {
        if(isHost) {
            setPlayerRed(socket.id);
        } else {
            setPlayerBlue(socket.id);
        }

        if (playerRed) {
            setTurn(players[1]);
            socket.emit("player_turn", { turn: players[1] });
          } else {
            setTurn(players[0]);
            socket.emit("player_turn", { turn: players[0] });
        }


        // TODO: remove dependency on data attributes
        // Turn an index of an array into matrix coordinates? based on board size
        const y = e.target.dataset.y
        const x = e.target.dataset.x
        // Returns if tile is already filled
        if (board[y][x].edges.length !== 0) {
            return;
        }
        // Returns if tile is not valid
        if (board[y][x].valid !== true) {
            return;
        }

        board[y][x] = active

        const pointsScored = helpers.pointCalc(board,y,x,5)
        if (pointsScored[1] !== undefined) {
            setRedScore(redScore + pointsScored[1]);
            socket.emit("update_scores", redScore);
        }
        if (pointsScored[2] !== undefined) {
            setBlueScore(blueScore + pointsScored[2]);
            socket.emit("update_scores", blueScore);
        }

        setBoard(board);
        socket.emit("update_board", board);
        setActive({edges:helpers.tileGen(players.length)});

        socket.emit("update_scores", { updatedRedScore: redScore });
        socket.emit("update_scores", { updatedBlueScore: blueScore });
        socket.emit("update_board", { updatedBoard: board }); 
    }

    useEffect(() => {
        if (playerRed && playerBlue && !turn) {
          if (isHost) {
            setTurn(players[0]);
            socket.emit("player_turn", { turn: players[0] });
          } else {
            setTurn(players[1]);
            socket.emit("player_turn", { turn: players[1] });
          }
        }
    }, [playerRed, playerBlue, turn]);
    
    
    useEffect(() => {
        // Receive events from the server
        socket.on("update_scores", (data) => {
          if (data && data.updatedRedScore && data.updatedBlueScore) {
            const { updatedRedScore, updatedBlueScore } = data;
            setRedScore(updatedRedScore);
            setBlueScore(updatedBlueScore);
          }
        });
    
        socket.on("update_board", (data) => {
          if (data && data.updatedBoard) {
            const { updatedBoard } = data;
            setBoard(updatedBoard);
          }
        });
    
        socket.on("player_turn", (data) => {
          if (data && data.turn) {
            const { turn } = data;
            setTurn(turn);
          }
        });
    
        socket.on("game_over", (data) => {
          if (data && data.winner) {
            const { winner } = data;
            let winnerMessage = "";
            if (winner === "draw") {
              winnerMessage = "Draw!";
            } else if (winner === "red") {
              winnerMessage = "Red Wins!";
            } else if (winner === "blue") {
              winnerMessage = "Blue Wins!";
            }
            alert(`Game Over!\n${winnerMessage}`);
          }
        });
    
        // Clean up the event listeners when the component unmounts
        return () => {
          socket.off("update_scores");
          socket.off("update_board");
          socket.off("player_turn");
          socket.off("game_over");
        };
      },[]);

    // The initialization of the game
    useEffect(()=>{
        socket.emit("game_started", { room });

        // This creates a shallow copy of the board and places a tile in the middle
        const boardCopy = JSON.parse(JSON.stringify(board))
        boardCopy[2][2].edges = [1,1,2,2];
        const boardValid = helpers.checkValid(boardCopy,active,5)
        setBoard(boardValid);
        setStarted(true);

        return () => {
            socket.off("game_started");
        };

    },[]);


    return (
        <section className="game">
            <Board handleTile={handleTile} board={board}/>
            <hr/>
            {/* Active Tile */}
            { <Tile edgeArr={active.edges} handleTile={handleTile} />}
            <h3>{turn === playerRed ? "Red" : "Blue"} Player's Turn</h3>
            <h3>Red Points: {redScore}</h3>
            <h3>Blue Points: {blueScore}</h3>
            {/* <div className="chat"> 
                <Chat socket={socket} room={room} username={username} />
            </div> */}
        </section>
    )
}

export default Game;