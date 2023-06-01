import React , {useState} from "react";
import Board from "../components/Board";
import Tile from "../components/Tile";
import helpers from "../utils/helpers"

function Game() {
    const [board, setBoard] = useState(helpers.generateBoard(5,5,()=>[]));
    const [turn, setTurn] = useState(1);
    const [players, setPlayers] = useState(2)
    const [active, setActive] = useState(helpers.tileGen(players));

    // Handles tile clicks
    function handleTile(e) {
        const x = e.target.dataset.x
        const y = e.target.dataset.y
        // Returns if cell is already filled
        if (board[y][x].length !== 0) {
            return;
        }
        board[y][x] = active;

        // TODO: Modularize to seperate function?
        if (turn == players) {
            setTurn(1)
        } else {
            setTurn(turn+1);
        }

        setActive(helpers.tileGen(players))
    }

    return (
        <section className="game">
            <Board handleTile={handleTile} board={board}/>
            <hr/>
            {/* Active Tile */}
            <Tile edgeArr={active} handleTile={handleTile} />
            <p>Player {turn}'s Turn</p>
        </section>
    )
}

export default Game;