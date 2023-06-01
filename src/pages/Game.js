import React , {useState} from "react";
import Board from "../components/Board";
import Tile from "../components/Tile";
import helpers from "../utils/helpers"

function Game() {
    const [board, setBoard] = useState(helpers.generateBoard(5,5,()=>[]));
    const [turn, setTurn] = useState('');
    const [active, setActive] = useState(helpers.tileGen(2));

    // Handles tile clicks
    function handleTile(e) {
        console.log(e.target)
        setActive(helpers.tileGen(2))
    }

    return (
        <section className="game">
            <Board handleTile={handleTile} board={board}/>
            <hr/>
            {/* This is the active tile */}
            <Tile edgeArr={active} handleTile={handleTile} />
        </section>
    )
}

export default Game;