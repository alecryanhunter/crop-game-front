import React , {useEffect, useState} from "react";
import Board from "../components/Board";
import Tile from "../components/Tile";
import helpers from "../utils/helpers"

function Game() {
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
    
    // TODO: Add end of game

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

    // The initialization of the game - set a tile in the middle and runs valid check
    useEffect(()=>{
        const boardCopy = JSON.parse(JSON.stringify(board))
        boardCopy[2][2].edges = [1,1,2,2];
        const boardValid = helpers.checkValid(boardCopy,active,5)
        setBoard(boardValid);
    },[]);

    return (
        <section className="game">
            <Board handleTile={handleTile} board={board}/>
            <hr/>
            {/* Active Tile */}
            <Tile edgeArr={active.edges} handleTile={handleTile} />
            <h3>{turn===1 ? "Red" : "Blue"} Player's Turn</h3>
            <h3>Red Points: {redScore}</h3>
            <h3>Blue Points: {blueScore}</h3>
        </section>
    )
}

export default Game;