import { INVALID_MOVE } from "boardgame.io/core";
import helpers from "../utils/helpers"

export const CropGame = {
    setup: ( {ctx} ) => {
        // Setup for elements that depend on the number of players
        const scores = []
        for (let i = 0; i < ctx.numPlayers;i++){
            const playerScore = {
                red: 0,
                blue: 0
            }
            scores.push(playerScore);
        }
        console.log(scores)

        return {
            active: {edges: [2,2,1,1]},
            tiles: helpers.checkValid(helpers.boardGen(5,5,()=>({edges:[]})),{edges:[2,2,1,1]},5),
            score: scores,
            workers: [5,5]
        }
    },
    moves: {
        generateTile: ({ G }) => {
            G.active = helpers.tileGen(2);
        },
        clickTile: ({ G, ctx, events, playerID },y,x) =>{
            // Checks if tile is filled. If it is, returns invalid move
            if (G.tiles[y][x].edges.length !== 0) {
                return INVALID_MOVE
            }
            // Checks if tile is valid placemenet
            if (G.tiles[y][x].valid === false) {
                return INVALID_MOVE
            }
            // Places the tile, then generates a new one
            G.tiles[y][x].edges = G.active.edges
            G.active = {edges: helpers.tileGen(2)};

            // Changes the board state with the new valid locations
            const validCheck = helpers.checkValid( G.tiles , G.active , 5)
            G.tiles = validCheck
            // events.setStage("choice");
            events.endTurn();
        },
        // Y is the Y-Axis, X is X-Axis, and W is edge (0-N,1-E,2-S,3-W)
        workerToggle: ({ G },y,x,remove) => {
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
            }
        },
        placeWorker: ({ G, playerID },y,x,w) => {
            // Checks if player has workers in their supply
            if (G.workers[playerID]===0) {
                return;
            }
            // Makes a workers array on this tile if none exists
            if (G.tiles[y][x].workers === undefined) {
                G.tiles[y][x].workers = {}
            }
            // Checks if a worker is on that quadrant already
            if (G.tiles[y][x].workers[w]) {
                return;
            }
            G.tiles[y][x].workers[w] = {playerID: playerID}
            G.workers[playerID]--
            // TODO: add events.endTurn() once other game aspects are complete
        },
        removeWorker: ({ G, ctx, playerID },y,x,w) => {
            // Checks if the worker you're trying to remove is yours or not
            if (G.tiles[y][x].workers[w].playerID !== ctx.currentPlayer) {
                return;
            }
            console.log(helpers.getPoints(G.tiles,y,x,w,5))
            delete G.tiles[y][x].workers[w]
            G.workers[playerID]++
        },
    },
    turn: {
        stages: {
            choice: {
                moves: {
                    // Placing a Worker on any tile
                    // Removing a Worker from any tile
                    // Sending a Worker to market
                },
                onBegin: () => {
                    // Turn beginning stuff (nothing currently?)
                },
                onEnd: () => {
                    // Turn end stuff (undo any straggling worker actives, return worker's from yesterday's market)
                },
            },
        },
    },
    endIf: ({ G }) => {
        let noValid = true
        for (let i = 0; i<G.tiles.length;i++) {
            for (let j =0; j<G.tiles[i].length;j++){
                if (G.tiles[i][j].valid) {
                    noValid = false
                }
            }
        }
        return noValid;
    }
};