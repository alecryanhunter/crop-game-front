import React , {useState} from "react";
import Board from "../components/Board";
import Tile from "../components/Tile";
import helpers from "../utils/helpers"

function Game() {
    const [board, setBoard] = useState(helpers.boardGen(5,5,()=>[]));
    const [turn, setTurn] = useState(1);
    const [players, setPlayers] = useState(2)
    const [active, setActive] = useState(helpers.tileGen(players));

    // Handles tile clicks
    function handleTile(e) {
        const y = e.target.dataset.y
        const x = e.target.dataset.x
        // Returns if cell is already filled
        if (board[y][x].length !== 0) {
            return;
        }
        board[y][x] = active;

        helpers.pointCalc(board,y,x,5);

        turnOrder()

        setActive(helpers.tileGen(players))
    }

    // Sets player's turn
    function turnOrder() {
        if (turn == players) {
            setTurn(1)
        } else {
            setTurn(turn+1);
        }
    }

    return (
        <section className="game">
            <Board handleTile={handleTile} board={board}/>
            <hr/>
            {/* Active Tile */}
            <Tile edgeArr={active} handleTile={handleTile} />
            <h3>Player {turn}'s Turn</h3>
            <h3>Red Points: </h3>
            <h3>Blue Points: </h3>
        </section>
    )
}

export default Game;