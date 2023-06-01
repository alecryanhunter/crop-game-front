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
    const edges = board[y][x];
    const points = {}

    // Top - [0]
    // Right - [1]
    // Bottom - [2]
    // Left - [3]

    // Detects Top Edge
    if (top >= 0) {
        if (edges[0] == board[top][x][2]){
            // console.log("top edge matches")
            if (edges[0] in points) {
                points[edges[0]]++;
            } else {
                points[edges[0]] =1;
            }
        }
    }
    // Detects Right Edge
    if (right != sideNum) {
        if (edges[1] == board[y][right][3]){
            // console.log("right edge matches")
            if (edges[1] in points) {
                points[edges[1]]++;
            } else {
                points[edges[1]] =1;
            }
        }
    }
    // Detects Bottom Edge
    if (bottom != sideNum) {
        if (edges[2] == board[bottom][x][0]){
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
        if (edges[3] == board[y][left][1]){
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

}

export default helpers