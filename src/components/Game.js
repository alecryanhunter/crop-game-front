import React , {useEffect, useState} from "react";
import Board from "./Board";
import Tile from "./Tile";
import Chat from "./Chat";
import helpers from "../utils/helpers";

function Game({ socket, room, username, host }) {

    console.log(socket);
    console.log("ROOM:", room);
    console.log("USERNAME:", username);
    console.log("HOST:", host);


    const [started,setStarted] = useState(false)
    // Each tile is an object with a key called "edges", which is an array with 4 items
    const [board, setBoard] = useState(helpers.boardGen(5,5,()=>({edges:[]})));
    const [turn, setTurn] = useState(1);
    const [players, setPlayers] = useState(2)
    const [redScore, setRedScore] = useState(0)
    const [blueScore, setBlueScore] = useState(0)
    const [active, setActive] = useState({edges:helpers.tileGen(players)});

    // Handles tile clicks
    function handleTile(e) {
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
        board[y][x].edges = active.edges;

        const pointsScored = helpers.pointCalc(board,y,x,5)
        if (pointsScored[1] !== undefined) {
            setRedScore(redScore + pointsScored[1])
        }
        if (pointsScored[2] !== undefined) {
            setBlueScore(blueScore + pointsScored[2])
        }

        turnOrder();

        setActive({edges:helpers.tileGen(players)})
        
    }
    
    // Sets player's turn
    function turnOrder() {
        if (turn === players) {
            setTurn(1)
        } else {
            setTurn(turn+1);
        }
    }
    
    // This checks for validity after any change in the active tile
    useEffect(()=>{
        setBoard(helpers.checkValid(board,active,5));
    },[active]);

    // Game Over Function
    useEffect(()=>{
        // Checks if the game setup has been finished
        if (started) {
            if (document.querySelector('.valid') === null) {
                let winner = ""
                if (redScore === blueScore) {
                    winner = "Draw!"
                } else if (redScore > blueScore){
                    winner = "Red Wins!"
                } else {
                    winner = "Blue Wins!"
                }
                alert(`Game Over!\n${winner}`)
                // TODO: Add automatic and/or opt-in game restart
            }
        }
    },[board])

    // The initialization of the game - set a tile in the middle and runs valid check
    useEffect(()=>{
        const boardCopy = JSON.parse(JSON.stringify(board))
        boardCopy[2][2].edges = [1,1,2,2];
        const boardValid = helpers.checkValid(boardCopy,active,5)
        setBoard(boardValid);
        setStarted(true)
    },[]);

    // useEffect(() => {
    //     socket.on("player_turn", (player) => {
    //         setTurn(player);
    //     });

    //     socket.on("update_board", (updateBoard) => {
    //         setBoard(updateBoard);
    //     });

    //     socket.on("update_scores", (scores) => {
    //         setRedScore(scores[0]);
    //         setBlueScore(scores[1]);
    //     });

    //     socket.on("game_over", (winner) => {
    //         alert(`Game Over!\n${winner}`);
    //     });

    //     return () => {
    //         socket.off("player_turn");
    //         socket.off("update_board");
    //         socket.off("update_scores");
    //         socket.off("game_over");
    //     };

    // }, [])

    return (
        <section className="game">
            <Board handleTile={handleTile} board={board}/>
            <hr/>
            {/* Active Tile */}
            <Tile edgeArr={active.edges} handleTile={handleTile} />
            <h3>{turn===1 ? "Red" : "Blue"} Player's Turn</h3>
            <h3>Red Points: {redScore}</h3>
            <h3>Blue Points: {blueScore}</h3>
            {/* <div className="chat"> 
                <Chat socket={socket} room={room} username={username} />
            </div> */}
        </section>
    )
}

export default Game;