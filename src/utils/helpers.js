const helpers = {

// Randomly generates the tile
tileGen: (numPlayers) => {
    let tile = [];
    for (let i = 0; i < 4; i++) {
        const num = Math.floor(Math.random() * numPlayers) + 1;
        tile.push(num);
    }
    return tile;
},
// Generates a defined matrix. filler is an arrow function ex: '()=>null'
boardGen: (rows, cols, filler) => {
    const board = Array(rows)
        .fill()
        .map(()=>
            Array(cols)
            .fill()
            .map(filler)
        )
    // TODO: Have initial square be fed into function
    board[Math.floor(rows/2)][Math.floor(cols/2)].edges = [1,1,2,2]
    return board
},
// Propagating point calculation. 1 quadrant = 1 point
getPoints: (board,y,x,w,sideNum) => {
    // All quadrants must be stored as strings for comparison
    const start = `${y}-${x}-${w}`;
    const queue = [start];
    const results = [];

    // Returns the counter-clockwise, clockwise, and opposite index for 4-length edge arrays
    const prev = (index) => (index === 0 ? 3 : index - 1);
    const next = (index) => (index === 3 ? 0 : index + 1);
    const opp = (index) => (index === 1 ? 3 : index === 0 ? 2 : index - 2);

    // As long as the queue has something, will run this
    while (queue.length) {
        const cur = queue.shift().split("-").map(i=>Number(i));
        results.push(`${cur[0]}-${cur[1]}-${cur[2]}`);
        const type = board[cur[0]][cur[1]].edges[cur[2]]

        // Checks the three adjacent quadrants: counter-clockwise, clockwise, and across
        // Counter-Clockwise
        const counCWIndex = prev(cur[2])
        const counCW =`${cur[0]}-${cur[1]}-${counCWIndex}`
        if (board[cur[0]][cur[1]].edges[counCWIndex] === type) {
            if (queue.indexOf(counCW) === -1 && results.indexOf(counCW) === -1) {
                queue.push(counCW);
            }
        }
        
        // Clockwise
        const cwIndex = next(cur[2])
        const cw =`${cur[0]}-${cur[1]}-${cwIndex}`
        if (board[cur[0]][cur[1]].edges[cwIndex] === type) {
            if (queue.indexOf(cw) === -1 && results.indexOf(cw) === -1) {
                queue.push(cw);
            }
        }

        // Across
        // Necessary translations for finding the across quadrant
        const top = Number(cur[0])-1;
        const right = Number(cur[1])+1;
        const bottom = Number(cur[0])+1;
        const left = Number(cur[1])-1;
        const acrossIndex = opp(cur[2])
        
        // Switch depending on quadrant orientation
        switch(cur[2]) {
            case 0: // North
                if (cur[0]!==0 && board[top][cur[1]].edges[acrossIndex] === type) {
                    const across =`${top}-${cur[1]}-${acrossIndex}`
                    if (queue.indexOf(across) === -1 && results.indexOf(across) === -1) {
                        queue.push(across)
                    }
                }
                break;
            case 1: // East
                if (cur[1]+1!==sideNum && board[cur[0]][right].edges[acrossIndex] === type) {
                    const across =`${cur[0]}-${right}-${acrossIndex}`
                    if (queue.indexOf(across) === -1 && results.indexOf(across) === -1) {
                        queue.push(across)
                    }
                }
                break;
            case 2: // South
                if (cur[0]+1!==sideNum && board[bottom][cur[1]].edges[acrossIndex] === type) {
                    const across =`${bottom}-${cur[1]}-${acrossIndex}`
                    if (queue.indexOf(across) === -1 && results.indexOf(across) === -1) {
                        queue.push(across)
                    }
                }
                break;
            case 3: // West
                if (left !== 0 && board[cur[0]][left].edges[acrossIndex] === type) {
                    const across =`${cur[0]}-${left}-${acrossIndex}`
                    if (queue.indexOf(across) === -1 && results.indexOf(across) === -1) {
                        queue.push(across)
                    }
                }
                break;
            default:
                console.log("invalid edge number");
        }
        
    }

    console.log("points",results.length);
    return results.length
},
checkValid: (board,active,sideNum)=>{
    const boardCopy = JSON.parse(JSON.stringify(board))
    for (let y = 0;y<boardCopy.length;y++){
        for (let x = 0;x<boardCopy[y].length;x++) {
            const curTile = boardCopy[y][x]
            curTile.valid = false;
        }}

    for (let y = 0;y<boardCopy.length;y++){
        for (let x = 0;x<boardCopy[y].length;x++) {
            const curTile = boardCopy[y][x]
            // Escapes if the tile is empty
            if (curTile.edges.length === 0){
                continue;
            }
            // Declaring variables at top
            const top = Number(y)-1;
            const right = Number(x)+1;
            const bottom = Number(y)+1;
            const left = Number(x)-1;
            // If top cell is empty, check if active's bottom edge matches curTiles top edge
            if (top >= 0){
                if (boardCopy[top][x].edges.length === 0 && curTile.edges[0] === active.edges[2]) {
                    boardCopy[top][x].valid = true
                }
            }
            if (right !== sideNum){
                if (boardCopy[y][right].edges.length === 0 && curTile.edges[1] === active.edges[3]) {
                    boardCopy[y][right].valid = true;
                }
            }
            if (bottom !== sideNum){
                if (boardCopy[bottom][x].edges.length === 0 && curTile.edges[2] === active.edges[0]) {
                    boardCopy[bottom][x].valid = true;
                }
            }
            if (left >= 0){
                if (boardCopy[y][left].edges.length === 0 && curTile.edges[3] === active.edges[1]) {
                    boardCopy[y][left].valid = true;
                }
            }

        }
    }

    return boardCopy
}

}

export default helpers