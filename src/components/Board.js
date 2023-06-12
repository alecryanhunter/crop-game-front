import { useState, useEffect } from 'react'
import Tile from "./Tile"
import EndScreen from './EndScreen';
import "../assets/styles/Game.css"

export function CropGameBoard({ ctx, G, moves, events, playerID, stages, matchData }) {
    const [mode, setMode] = useState("");
    const [choices,setChoices] = useState(G.choices);

    // This function de-toggles any straggling worker selection boxes
    function deToggleWorker() {
        for (let i = 0; i<G.tiles.length;i++) {
            for (let j =0; j<G.tiles[i].length;j++){
                if (G.tiles[i][j].workersActive) {
                    moves.workerToggle(i,j,false);
                }
            }
        }
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

            if (clicked.workersActive && G.choices === true){
                moves.removeWorker(y,x,w)
                setMode("")
                moves.marketReturn();
                deToggleWorker();
                events.endTurn();
            } else {
                moves.workerToggle(y,x,true);
            }

        // Worker Placemenet
        } else if (clicked.edges.length!==0 && mode === "worker") {

            if(clicked.workersActive && G.choices === true) {
                moves.placeWorker(y,x,w);
                setMode("");
                moves.marketReturn();
                deToggleWorker();
                events.endTurn();
            } else {
                moves.workerToggle(y,x,false);
            }
        }
    };

    // Send Workers to Market
    function handleMarketSell(type) {
        if (G.choices === true) {
            moves.marketSell(type);
            setMode("");
            moves.marketReturn();
            events.endTurn();
        }
    }

    // Mode Toggle
    function handleModeToggle(e) {
        e.preventDefault();
        const { name } = e.target
        // if (ctx.currentPlayer !== playerID) {
        //     return;
        // }
        if (mode==="worker" || mode==="remove") {
            deToggleWorker();
        }
        setMode(name);
    }

    return (
        <section className="game">
            {ctx.gameover ? <EndScreen coins={G.coins} matchData={matchData} playerID={playerID}/> :
            (<>
            <section className='game-left'>
                
            {/* PLAYER INFO */}
            <section>
                <section className='player-info'>

                    {[...Array(ctx.numPlayers)].map((e,i)=> (
                    <section className={`player-card player-${i}`} key={i}>
                        <h3>{matchData[i].name}</h3>
                        <h5>Coins: {G.coins[i]}</h5>
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
                        {/* TODO: Change to be array-based so it scales with more players */}
                        <p>{matchData[0].name}</p>
                        <section className='crops'>
                            {[...Array(G.market[0].green.amount+G.marketSell[0].green.amount)].map((e,i)=> (
                                <div
                                    key={i}
                                    className='crop crop-green'
                                />
                            ))}
                        </section>
                        <section className='crops'>
                            {[...Array(G.market[0].yellow.amount+G.marketSell[0].yellow.amount)].map((e,i)=> (
                                <div
                                    key={i}
                                    className='crop crop-yellow'
                                />
                            ))}
                        </section>
                        <p>{matchData[1].name}</p>
                        <section className='crops'>
                            {[...Array(G.market[1].green.amount+G.marketSell[1].green.amount)].map((e,i)=> (
                                <div
                                    key={i}
                                    className='crop crop-green'
                                />
                            ))}
                        </section>
                        <section className='crops'>
                            {[...Array(G.market[1].yellow.amount+G.marketSell[1].yellow.amount)].map((e,i)=> (
                                <div
                                    key={i}
                                    className='crop crop-yellow'
                                />
                            ))}
                        </section>
                </section>
                {playerID === ctx.currentPlayer ? <h3 className='turn-indicator'>Your Turn!</h3> : null}
                <section className='commands'>
                    <Tile
                        name={"tile"}
                        edgeArr={G.active.edges}
                        handleModeToggle={handleModeToggle}
                        inactive={G.choices}
                    />
                    <p>Click to place a tile on a valid location, then choose one of the following three options</p>
                    <button
                        name='worker'
                        onClick={handleModeToggle}
                        className={G.choices ? null : "choices"}
                    >Place Worker</button>
                    <p>Click a placed tile, then click the desired quadrant</p>
                    <button
                        name='remove'
                        onClick={handleModeToggle}
                        className={G.choices ? null : "choices"}
                    >Remove Worker</button>
                    <p>Click a tile with a worker, then click the worker</p>
                    <button
                        name='market'
                        onClick={handleModeToggle}
                        className={G.choices ? null : "choices"}
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
            </>)}
        </section>
    );
}