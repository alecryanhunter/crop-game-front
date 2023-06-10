import { INVALID_MOVE } from "boardgame.io/core";
import helpers from "../utils/helpers"

function color(num) {
    switch (num) {
        case 1 : return "green";
        case 2 : return "yellow";
        case 3 : return "orange";
        case 4 : return "beige";
        default: return "black";
    }
}

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
    }
}

function marketReturn (G, playerID) {
    for (let i = 1;i<=G.market.length;i++) {
        G.coins[playerID] += G.market[playerID][color(i)].amount
        G.market[playerID][color(i)].amount = 0
    }
    G.coins[playerID] += G.marketSell[playerID]

    G.workers[playerID]++
}

// Y is the Y-Axis, X is X-Axis, and W is edge (0-N,1-E,2-S,3-W)
function placeWorker ({ G, playerID, events },y,x,w) {
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
    
    marketReturn(G,playerID)
    events.endTurn();
}

function removeWorker ({ G, ctx, playerID, events },y,x,w) {
    // Checks if the worker you're trying to remove is yours or not
    if (G.tiles[y][x].workers[w].playerID !== ctx.currentPlayer) {
        return;
    }
    // Finds the color the worker is one, and increments the corresponding point value
    const type = G.tiles[y][x].edges[w]
    G.inventory[playerID][color(type)] += helpers.getPoints(G.tiles,y,x,w,G.bSize)

    // Removes the worker and increments the player's worker count
    delete G.tiles[y][x].workers[w]
    G.workers[playerID]++

    
    
    marketReturn(G,playerID)
    events.endTurn();
}

function marketSell ({ G, playerID, events },type) {
    if (G.workers[playerID]===0) {
        return;
    }

    for (let i = 1;i<=G.market.length;i++) {
        G.marketSell[playerID] += G.market[playerID][color(i)].amount
        G.market[playerID][color(i)].amount = 0
    }

    G.market[playerID][type].amount = G.inventory[playerID][type]
    G.inventory[playerID][type] = 0
    G.workers[playerID]--

    marketReturn(G,playerID);
    events.endTurn();
}

export const CropGame = {
    name: "Cropposition",
    setup: ( {ctx} ) => {
        // CHANGE BOARD SIZE HERE (Also need to update CSS grid styling)
        const bSize = 9
        // Setup for elements that depend on the number of players
        const coins = []
        const inventory = []
        const workers = []
        const market = []
        const marketSell = []

        for (let i = 0; i < ctx.numPlayers;i++){
            const playerScore = {
                green: 0,
                yellow: 0,
                orange: 0,
                tan: 0
            }
            const playerMarket = {
                green: {
                    amount: 0,
                },
                yellow: {
                    amount: 0,
                },
                orange: {
                    amount: 0,
                },
                tan: {
                    amount: 0,
                },
            }
            coins.push(0)
            inventory.push(playerScore);
            workers.push(5)
            market.push(playerMarket);
            marketSell.push(0)
        }

        return {
            active: {edges: [2,2,1,1]},
            tiles: helpers.checkValid(helpers.boardGen(bSize,bSize,()=>({edges:[],workersActive:false})),{edges:[2,2,1,1]},bSize),
            coins: coins,
            inventory: inventory,
            workers: workers,
            market: market,
            marketSell: marketSell,
            bSize: bSize
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
            const validCheck = helpers.checkValid( G.tiles , G.active , G.bSize)
            G.tiles = validCheck
            events.setStage("choice");
        },
    },
    turn: {
        stages: {
            choice: {
                moves: {
                    placeWorker,
                    removeWorker,
                    marketSell
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