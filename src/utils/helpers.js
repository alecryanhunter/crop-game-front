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
// Propagating function for calculating points
// w is the index of the edge it should start from
// done is an array of the tiles already calculated. should not be fed on initial function call
// TODO: use queue layout
getPoints: (board,y,x,w,sideNum,done,impPoints) => {
    console.log("==============================")
    const top = Number(y)-1;
    const right = Number(x)+1;
    const bottom = Number(y)+1;
    const left = Number(x)-1;
    const edges = board[y][x].edges;
    const startEdge = board[y][x].edges[w]
    let points = 0
    if (impPoints!==undefined){
        points += impPoints
    }
    console.log(points);
    let northSelect
    let eastSelect
    let southSelect
    let westSelect
    function edgeToggle(index) {
        switch(index) {
            case 0:
                northSelect = true;
                break;
            case 1:
                eastSelect = true;
                break;
            case 2:
                southSelect = true;
                break;
            case 3:
                westSelect = true;
                break;
            default:
                console.log("invalid edge length");
        }
    }
    // Functions for finding counter-clockwise, clockwise, and opposite edge indices
    // Only designed to work for arrays of length 4 (the edges)
    const prev = (index) => (index === 0 ? 3 : index - 1);
    const next = (index) => (index === 3 ? 0 : index + 1);
    const opp = (index) => (index === 1 ? 3 : index === 0 ? 2 : index - 2);

    
    const newDoneArr=[]
    const newDone = `${y}-${x}`
    newDoneArr.push(newDone)
    console.log("imported done",done)
    console.log("new done",newDoneArr)
    const combDoneArr = (done!==undefined ? newDoneArr.concat(done) : newDoneArr);
    console.log("combined",combDoneArr)

    edgeToggle(w)
    if (startEdge === edges[prev(w)]) {
        // Do stuff here
        edgeToggle(prev(w));
        // console.log("Matches counter-clockwise");
    }
    if (startEdge === edges[next(w)]) {
        // Do stuff here
        edgeToggle(next(w));
        // console.log("Matches clockwise");
    }
    if ((startEdge === edges[prev(w)] || startEdge === edges[next(w)]) && startEdge === edges[opp(w)]){
        // Do stuff here
        edgeToggle(opp(w));
        // console.log("Matches opposite");
    }

    const topDone = combDoneArr.indexOf(`${top}-${x}`);
    // Detects Top Edge
    if (top >= 0 && northSelect && topDone === -1) {
        if (edges[0] === board[top][x].edges[2]){
            points += 1
            const newPoints = helpers.getPoints(board,top,x,2,5,combDoneArr, points)
            points += newPoints
        }
    }
    const rightDone = combDoneArr.indexOf(`${y}-${right}`)
    // Detects Right Edge
    if (right !== sideNum && eastSelect && rightDone === -1) {
        if (edges[1] === board[y][right].edges[3]){
            points += 1
            const newPoints = helpers.getPoints(board,y,right,3,5,combDoneArr, points)
            points += newPoints
        }
    }
    const bottomDone = combDoneArr.indexOf(`${bottom}-${x}`);
    // Detects Bottom Edge
    if (bottom !== sideNum && southSelect && bottomDone === -1) {
        if (edges[2] === board[bottom][x].edges[0]){
            points += 1
            const newPoints = helpers.getPoints(board,bottom,x,0,5,combDoneArr, points)
            points += newPoints
        }
    }
    const leftDone = combDoneArr.indexOf(`${y}-${left}`);
    // Detects Left Edge
    if (left >= 0 && westSelect && leftDone === -1) {
        if (edges[3] === board[y][left].edges[1]){
            points += 1
            const newPoints = helpers.getPoints(board,y,left,1,5,combDoneArr, points)
            points += newPoints
        }
    }

    console.log(y,x,w,points);
    return points;
},
// Create it resembling a BFS (idk, maybe a DFS)
newPoints: (board,y,x,w,sideNum) => {
    // Create a queue array of y,x,w coords !!!
    // Insert starting quadrant into queue !!!
    // Create a results array whose length will be the points scored !!!
    // WHILE queue has items,
        // Analyze 1st queue quadrant with queue.shift();
        // Push to results array

    // All quadrants must be stored as strings for comparison
    const start = `${y}-${x}-${w}`;
    const queue = [start];
    const results = [];

    // Returns the counter-clockwise, clockwise, and opposite index for 4-length edge arrays
    const prev = (index) => (index === 0 ? 3 : index - 1);
    const next = (index) => (index === 3 ? 0 : index + 1);
    const opp = (index) => (index === 1 ? 3 : index === 0 ? 2 : index - 2);

    while (queue.length) {
        const cur = queue.shift().split("-").map(i=>Number(i));
        console.log("queue",queue);
        results.push(`${cur[0]}-${cur[1]}-${cur[2]}`);
        console.log("results",results);
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
        // this will be complicated, depends on the facing of the quadrant
        const top = Number(cur[0])-1;
        const right = Number(cur[1])+1;
        const bottom = Number(cur[0])+1;
        const left = Number(cur[1])-1;
        // ===============
        const acrossIndex = opp(cur[2])
            // Want some way to dynamically assign
            // 0 - top , cur
            // 1 - cur, right
            // 2 - bottom, cur
            // 3 - cur, left
        
        switch(cur[2]) {
            case 0:
                if (cur[0]!==0 && board[top][cur[1]].edges[acrossIndex] === type) {
                    const across =`${top}-${cur[1]}-${acrossIndex}`
                    queue.push(across)
                }
                break;
            case 1:
                if (cur[1]+1!==sideNum && board[cur[0]][right].edges[acrossIndex] === type) {
                    const across =`${cur[0]}-${right}-${acrossIndex}`
                    queue.push(across)
                }
                break;
            case 2:
                if (cur[0]+1!==sideNum && board[bottom][cur[1]].edges[acrossIndex] === type) {
                    const across =`${bottom}-${cur[1]}-${acrossIndex}`
                    queue.push(across)
                }
                break;
            case 3:
                if (left !== 0 && board[cur[0]][left].edges[acrossIndex] === type) {
                    const across =`${cur[0]}-${left}-${acrossIndex}`
                    queue.push(across)
                }
                break;
            default:
                console.log("invalid edge number");
        }
        
        // const across =`${acrossY}-${acrossX}-${acrossIndex}`

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