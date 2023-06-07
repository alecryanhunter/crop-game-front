import { INVALID_MOVE } from "boardgame.io/core";
import helpers from "../utils/helpers"

export const CropGame = {
    setup: () => {
        return {
            cells: helpers.boardGen(5,5,()=>({edges:[]})),
            active: helpers.tileGen(2)
        }
    },
    moves: {
        generateTile: ({G}) => {
            G.active = helpers.tileGen(2);
        },
        clickTile: ({ G, playerID }, y,x) =>{
            // Checks if cell is filled. If it is, returns invalid move
            if (G.cells[y][x].edges.length !== 0) {
                return INVALID_MOVE
            }
            // Places the tile, then generates a new one
            G.cells[y][x].edges = G.active
            G.active = helpers.tileGen(2);
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