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
    return Array(rows)
        .fill()
        .map(()=>
            Array(cols)
            .fill()
            .map(filler)
        )
},
// Calculates points based on edge adjacency only
// TODO: Cascade to all matching edges? like merge sort, call during a concat()?
pointCalc: (board,y,x,sideNum) => {
    // Declaring variables at top
    const top = Number(y)-1;
    const right = Number(x)+1;
    const bottom = Number(y)+1;
    const left = Number(x)-1;
    const edges = board[y][x].edges;
    const points = {}

    // Top - [0]
    // Right - [1]
    // Bottom - [2]
    // Left - [3]

    // Detects Top Edge
    if (top >= 0) {
        if (edges[0] === board[top][x].edges[2]){
            // console.log("top edge matches")
            if (edges[0] in points) {
                points[edges[0]]++;
            } else {
                points[edges[0]] =1;
            }
        }
    }
    // Detects Right Edge
    if (right !== sideNum) {
        if (edges[1] === board[y][right].edges[3]){
            // console.log("right edge matches")
            if (edges[1] in points) {
                points[edges[1]]++;
            } else {
                points[edges[1]] =1;
            }
        }
    }
    // Detects Bottom Edge
    if (bottom !== sideNum) {
        if (edges[2] === board[bottom][x].edges[0]){
            // console.log("bottom edge matches")
            if (edges[2] in points) {
                points[edges[2]]++;
            } else {
                points[edges[2]] =1;
            }
        }
    }
    // Detects Left Edge
    if (left >= 0) {
        if (edges[3] === board[y][left].edges[1]){
            // console.log("left edge matches")
            if (edges[3] in points) {
                points[edges[3]]++;
            } else {
                points[edges[3]] =1;
            }
        }
    }
    return points
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