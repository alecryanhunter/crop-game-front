import { useState } from 'react'
import Tile from "./Tile"
import "../style.css"

export function CropGameBoard({ ctx, G, moves, events, playerID }) {
    const [mode, setMode] = useState("");

    function endTurn() {
        events.endTurn();
    }

    // Handles Tile Clicks Conditionally
    function handleTileClick(y,x,w) {
        const clicked = G.tiles[y][x]

        // Tile Placement
        if (clicked.valid===true && mode==="tile") {
            moves.clickTile(y,x)
            setMode("")

        // Worker Removal
        } else if (clicked.workers && mode === "remove") {

            if (clicked.workersActive){
                moves.removeWorker(y,x,w)
                setMode("")
            }
            moves.workerToggle(y,x,true)

        // Worker Placemenet
        } else if (clicked.edges.length!==0 && mode === "worker") {

            if(clicked.workersActive) {
                moves.placeWorker(y,x,w);
                setMode("");
            }
            moves.workerToggle(y,x,false);
        }
    };

    // Mode Toggle
    function handleModeToggle(e) {
        e.preventDefault();
        const { name } = e.target
        if (ctx.currentPlayer !== playerID) {
            return;
        }
        if (mode==="worker" || mode==="remove") {
            // This for loop will de-toggle any active worker placement on mode toggle
            for (let i = 0; i<G.tiles.length;i++) {
                for (let j =0; j<G.tiles[i].length;j++){
                    if (G.tiles[i][j].workersActive) {
                        moves.workerToggle(i,j,false);
                    }
                }
            }
        }
        setMode(name);
    }

    return (
        <section className="game">

            <section className='game-left'>
                
            {/* PLAYER INFO */}
            <section>
                <section>
                    <section className='player-info'>
                        <h3>Player One</h3>
                        <p>Green Score: {G.inventory[0].green}</p>
                        <p>Yellow Score: {G.inventory[0].yellow}</p>
                        <h4>Player One Workers: {G.workers[0]}</h4>
                    </section>
                    <section className='player-info'>
                        <h3>Player Two</h3>
                        <p>Green Score: {G.inventory[1].green}</p>
                        <p>Yellow Score: {G.inventory[1].yellow}</p>
                        <h4>Player Two Workers: {G.workers[1]}</h4>
                    </section>
                </section>
                <button
                    name='worker'
                    onClick={handleModeToggle}
                    >Place Worker</button>
                <button
                    name='remove'
                    onClick={handleModeToggle}
                    >Remove Worker</button>
            </section>

            {/* BOARD */}
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
                        workersRemove={tile.workersRemove}
                        />
                        ))
                        )}
            </section>
            </section>


            <section className='game-right'>
                <section className='market'>
                        <h3>Market</h3>
                        <p>Player One:</p>
                        <p>Player Two:</p>
                </section>
                <Tile
                    name={'tile'}
                    edgeArr={G.active.edges}
                    handleModeToggle={handleModeToggle}
                    />
                <aside className='mode'>
                    <h4>Mode</h4>
                    <p>Click on the tile, and then click a valid tile</p>
                    <p>{mode}</p> {/* tile, worker, remove*/}
                </aside>
                <button onClick={endTurn}>End Turn</button>
            </section>

        </section>
    );
}