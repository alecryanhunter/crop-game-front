import {useState} from 'react';

function Tile({handleTile,edgeArr,x,y}) {
    // const [edges,setEdges] = useState(edgeArr)

    // This function takes an array and returns a space sepearted list of colors
    // Used for generating border-colors automatically
    function colorPicker(arr) {
        let colors = ""
        if (arr===undefined){
            return "black";
        }
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
            data-y={y}
            data-x={x}
        ></button>
    )
}

export default Tile;