import React , {useState} from "react";
import Board from "../components/Board";
import Tile from "../components/Tile";

function Game() {
    const [board, setBoard] = useState('');
    const [turn, setTurn] = useState('');
    const [active, setActive] = useState(tileGeneration());

    // Randomly generates the tile
    function tileGeneration() {
        let tile = []
        // numColors controls the number of players
        const numColors = 2
        for  (let i=0;i<4;i++){
            const num = Math.floor(Math.random()*numColors)+1;
            tile.push(num);
        }
        return tile
    }


    return (
        <section className="game">
            <Board setActive={setActive} tileGen={tileGeneration}/>
            <hr/>
            {/* This is the active tile */}
            <Tile edgeArr={active} setActive={setActive} tileGeneration={tileGeneration} />
        </section>
    )
}

export default Game;