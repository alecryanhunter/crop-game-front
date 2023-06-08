import { useState } from 'react'
import Tile from "../components/Tile"
import "../style.css"

export function CropGameBoard({ ctx, G, moves, events }) {
    const [mode, setMode] = useState("");

    function endTurn() {
        events.endTurn();
    }

    // Handles Tile Clicks Conditionally
    function handleTileClick(y,x,w) {
        if (G.tiles[y][x].valid===true) {
            if(mode==="tile") {
                moves.clickTile(y,x)
                setMode("")
            }
        } else if (G.tiles[y][x].edges.length!==0) {
            if(mode==="setup") {
                moves.placeWorkerToggle(y,x,w)
                setMode("worker");
            } else if (mode==="worker" && G.tiles[y][x].workersActive) {
                moves.scorePoints(y,x,w)
                // moves.placeWorker(y,x,w);
                // moves.placeWorkerToggle(y,x,w);
                setMode("");
            }
        }
    };

    // TODO: fix mode toggling not on your turn
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
                        handleTileClick={handleTileClick}
                        workers={tile.workers}
                        workersActive={tile.workersActive}
                        />
                    ))
                )}
            </section>
            <aside>
                <Tile
                    name={'tile'}
                    edgeArr={G.active.edges}
                    handleModeToggle={handleModeToggle}
                    />
                <section>
                    <h3>Red Score: {G.score[0]}</h3>
                    <h3>Blue Score: {G.score[1]}</h3>
                    <p>Mode: {mode}</p>
                    <p>Click on the tile, and then click a valid tile</p>
                </section>
                <button onClick={endTurn}>End Turn</button>
            </aside>
        </section>
    );
}