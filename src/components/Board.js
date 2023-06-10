import { useState } from 'react'
import Tile from "./Tile"
import "../assets/styles/Game.css"

export function CropGameBoard({ ctx, G, moves, events, playerID, stages }) {
    const [mode, setMode] = useState("");

    function workerToggle (G,y,x,remove)  {
    // remove is a flag telling this move whether you're removing or placing
    if (G.tiles[y][x].workersActive) {
        G.tiles[y][x].workersActive = false
        if (remove) {
            G.tiles[y][x].workersRemove = false
        }
    } else {
        G.tiles[y][x].workersActive = true;
        if (remove) {
            G.tiles[y][x].workersRemove = true
        }
    }}

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
            workerToggle(G,y,x,true)

        // Worker Placemenet
        } else if (clicked.edges.length!==0 && mode === "worker") {

            if(clicked.workersActive) {
                moves.placeWorker(y,x,w);
                setMode("");
            }
            workerToggle(G,y,x,false);
        }
    };

    // Send Workers to Market
    function handleMarketSell(type) {
        moves.marketSell(type);
    }

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
                        moves.workerToggle(G,i,j,false);
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
                <section className='player-info'>

                    {[...Array(ctx.numPlayers)].map((e,i)=> (
                    <section className={`player-card player-${i}`} key={i}>
                        <h3>Player {i+1}</h3>
                        <h5>Coins: {G.coins[0]}</h5>
                        {/* FARMHOUSE */}
                        <h5>Workers</h5>
                        <section className='farmhouse'>
                            {[...Array(G.workers[i])].map((e,i)=> (
                                <div
                                    key={i}
                                    className={`farm-worker`}
                                />
                            ))}
                        </section>
                        {/* SILO */}
                        <section className='silo'>
                            <h5>Crops</h5>
                            <section className='crops'>
                                {[...Array(G.inventory[i].green)].map((e,i)=> (
                                    <div
                                        key={i}
                                        className='crop crop-green'
                                    />
                                ))}
                            </section>
                            <section className='crops'>
                                {[...Array(G.inventory[i].yellow)].map((e,i)=> (
                                    <div
                                        key={i}
                                        className='crop crop-yellow'
                                    />
                                ))}
                            </section>
                        </section>
                    </section>
                    ))}
                    
                </section>
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
                )))}
            </section>
            </section>


            <section className='game-right'>
                <div className='game-right-scroll'>
                <section className='market'>
                        <h3>Market</h3>
                        <p>Player One:</p>
                        <section className='crops'>
                            {[...Array(G.market[0].green.amount)].map((e,i)=> (
                                <div
                                    key={i}
                                    className='crop crop-green'
                                />
                            ))}
                        </section>
                        <section className='crops'>
                            {[...Array(G.market[0].yellow.amount)].map((e,i)=> (
                                <div
                                    key={i}
                                    className='crop crop-yellow'
                                />
                            ))}
                        </section>
                        <p>Player Two:</p>
                        <section className='crops'>
                            {[...Array(G.market[1].green.amount)].map((e,i)=> (
                                <div
                                    key={i}
                                    className='crop crop-green'
                                />
                            ))}
                        </section>
                        <section className='crops'>
                            {[...Array(G.market[1].yellow.amount)].map((e,i)=> (
                                <div
                                    key={i}
                                    className='crop crop-yellow'
                                />
                            ))}
                        </section>
                </section>
                <section className='commands'>
                    <Tile
                        name={'tile'}
                        edgeArr={G.active.edges}
                        handleModeToggle={handleModeToggle}
                    />
                    <p>Click to place a tile on a valid location, then choose one of the following three options</p>
                    <button
                        name='worker'
                        onClick={handleModeToggle}
                    >Place Worker</button>
                    <p>Click a placed tile, then click the desired quadrant</p>
                    <button
                        name='remove'
                        onClick={handleModeToggle}
                    >Remove Worker</button>
                    <p>Click a tile with a worker, then click the worker</p>
                    <button
                        name='market'
                        onClick={handleModeToggle}
                    >Send Worker to Market</button>
                    {mode==="market" ? (
                        <>
                        <button 
                            className='crop-btn'
                            onClick={()=>handleMarketSell("green")}
                        >Green</button>
                        <button 
                            className='crop-btn'
                            onClick={()=>handleMarketSell("yellow")}
                        >Yellow</button>
                        </>
                    ) : null }
                    <p>Click the button, then click the desired crop to sell</p>
                </section>
                </div>
            </section>

        </section>
    );
}