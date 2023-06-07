import { INVALID_MOVE } from "boardgame.io/core";
import helpers from "../utils/helpers"

export const CropGame = {
    setup: () => {
        return {
            active: {edges: [2,2,1,1]},
            tiles: helpers.checkValid(helpers.boardGen(5,5,()=>({edges:[]})),{edges:[2,2,1,1]},5),
            score: [0,0],
        }
    },
    moves: {
        generateTile: ({ G }) => {
            G.active = helpers.tileGen(2);
        },
        clickTile: ({ G },y,x) =>{
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

            const points = helpers.pointCalc(G.tiles,y,x,5);
            if (points[1] !== undefined) {
                G.score[0] = G.score[0] + points[1]
            }
            if (points[2] !== undefined) {
                G.score[1] = G.score[1] + points[2]
            }

            // Changes the board state with the new valid locations
            const validCheck = helpers.checkValid( G.tiles , G.active , 5)
            G.tiles = validCheck
        },
    },
    turn: {
        minMoves: 1,
        maxMoves: 1,
        stages: {
            begin: {
                next: "placement"
            },
            placement: {
                next: "score"
            },
            score: {
                next: "begin"
            }
        }
    },
};