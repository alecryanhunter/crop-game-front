import { useState } from 'react'
import Tile from "../components/Tile"
import "../style.css"

export function CropGameBoard({ ctx, G, moves, events }) {
    const [mode, setMode] = useState("");

    function endTurn() {
        events.endTurn();
    }

    function onTileClick(y,x) {
        console.log(mode)
        if (G.tiles[y][x].valid===true) {
            if(mode==="tile") {
                moves.clickTile(y,x)
                setMode("")
            }
        } else if (G.tiles[y][x].edges.length!==0) {
            if(mode==="setup") {
                moves.placeWorkerSetup(y,x,0)
                setMode("worker");
            } else if (mode==="worker") {
                console.log("place worker");
            }
        }
    };

    function handleModeToggle(e) {
        e.preventDefault();
        if (mode==="worker") {
            return;
        }
        const { name } = e.target
        setMode(name);
    }

    return (
        <section className="game">
            <section>
                {/* TODO: move these onClick to the more interactive moments like the tile or workers */}
                <button
                    name='tile'
                    onClick={handleModeToggle}
                >Place Tile</button>
                <button
                    name='setup'
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
                        onClick={onTileClick}
                        workers={tile.workers}
                        workersActive={tile.workersActive}
                        />
                    ))
                )}
            </section>
            <aside>
                <Tile 
                    edgeArr={G.active.edges}
                    onClick={()=>""}
                />
                <section>
                    <h3>Red Score: {G.score[0]}</h3>
                    <h3>Blue Score: {G.score[1]}</h3>
                </section>
                <button onClick={endTurn}>End Turn</button>
            </aside>
            <div className='square'>
                <div className="mini-tile" onClick={()=>console.log("top")}></div>
                <div className="mini-tile" onClick={()=>console.log("right")}></div>
                <div className="mini-tile" onClick={()=>console.log("bottom")}></div>
                <div className="mini-tile" onClick={()=>console.log("left")}></div>
            </div>
        </section>
    );
}