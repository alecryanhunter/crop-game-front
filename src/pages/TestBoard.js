import { useState } from 'react'
import Tile from "../components/Tile"
import "../style.css"

export function CropGameBoard({ ctx, G, moves }) {
    const [mode, setMode] = useState("");

    const onClick = (y,x) => {
        if(mode==="tile") {
            moves.clickTile(y,x)
            setMode("")
        }
        if(mode==="worker") {
            moves.placeWorker(y,x,0)
            setMode("");
        }
    };

    function handleModeToggle(e) {
        e.preventDefault();
        const { name } = e.target
        setMode(name);
    }

    return (
        <section className="game">
            <section>
                <button
                    name='tile'
                    onClick={handleModeToggle}
                >Place Tile</button>
                <button
                    name='worker'
                    onClick={handleModeToggle}
                >Place Worker</button>
                <h4>Red Workers: {G.workers[0]}</h4>
                <h4>Blue Workers: {G.workers[1]}</h4>
            </section>
            <section className="board">
                {G.tiles.map((row,rowIndex) => 
                    row.map((tile,colIndex)=> (
                        <Tile
                        key={`${colIndex}-${rowIndex}`} 
                        y={rowIndex} 
                        x={colIndex} 
                        edgeArr={tile.edges}
                        valid={tile.valid}
                        onClick={onClick}
                        workers={tile.workers}
                        />
                    ))
                )}
            </section>
            <aside>
                <Tile 
                    edgeArr={G.active.edges}
                />
                <section>
                    <h3>Red Score: {G.score[0]}</h3>
                    <h3>Blue Score: {G.score[1]}</h3>
                </section>
            </aside>
            <div className='square'>
                <div onClick={()=>console.log("top")}></div>
                <div onClick={()=>console.log("right")}></div>
                <div onClick={()=>console.log("bottom")}></div>
                <div onClick={()=>console.log("left")}></div>
            </div>
        </section>
    );
}