import {useState} from 'react';

function Tile({setActive,edgeArr,x,y}) {
    // const [edges,setEdges] = useState(edgeArr)

    // Handles tile click
    function handleTile(e) {
        console.log(e.target)
        setActive(tileGeneration())
    }

    // TODO: Duplicate function - figure out how to pass it down
    function tileGeneration() {
        let tile = []
        // numColors controls the number of players
        const numColors = 2
        for  (let i=0;i<4;i++){
            const num = Math.floor(Math.random()*numColors)+1;
            tile.push(num);
        }
        return tile
    }

    // This function takes an array and returns a space sepearted list of colors
    // Used for generating border-colors automatically
    function colorPicker(arr) {
        let colors = ""
        for(let i=0;i<arr.length;i++){
            colors = colors +" "+ colorSelect(arr[i]);
        }

        function colorSelect(num) {
            switch (num) {
                case 0 :
                    return "gray";
                case 1 :
                    return "crimson";
                case 2 :
                    return "navy";
                case 3 :
                    return "goldenrod";
                case 4 :
                    return "darkgreen";
                default:
                    return "black";
            }
        }
        return colors
    }

    // Sets border style attributes only
    const style = {
        borderColor: `${colorPicker(edgeArr)}`,
        borderStyle: "solid",
        borderWidth: "50px"
    }

    return (
        <button
            style={style}
            onClick={handleTile}
            className="tile"
            data-x={x}
            data-y={y}
        ></button>
    )
}

export default Tile;