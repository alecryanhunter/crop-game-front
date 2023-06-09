import {useState} from 'react';

function Tile({handleTileClick,handleModeToggle,edgeArr,valid,name,x,y,workers,workersActive,workersRemove}) {
    // const [edges,setEdges] = useState(edgeArr)

    // This function takes an array and returns a space sepearted list of colors
    // Used for generating border-colors automatically
    // TODO: move these to helpers?
    function colorPicker(arr) {
        let colors = ""
        if (arr===undefined){
            return "black";
        }
        for(let i=0;i<arr.length;i++){
            colors = colors +" "+ colorSelect(arr[i]);
        }

        return colors
    }

    function colorSelect(num) {
        switch (num) {
            case 0 :
                return "gray";
            // Tile Colors
            case 1 :
                return "#6AB04A";
            case 2 :
                return "#E7CB36";
            case 3 :
                return "#FF8900";
            case 4 :
                return "#D8C3A5";
            // Player Colors
            case 10 :
                return "crimson";
            case 11 :
                return "navy";
            default:
                return "black";
        }
    }

    // Sets border style attributes only
    const style = {
        borderColor: `${colorPicker(edgeArr)}`,
        borderStyle: "solid",
        borderWidth: "50px",
    }

    return (
        <>
        {workersActive ? (
            // Worker Placement Mode
            workersRemove ? (
                <div className='sq'>
                    {workers[0] ? (
                        <div 
                        className='line north' 
                        style={{background: colorSelect(Number(workers[0].playerID)+10)}}
                        onClick={()=>handleTileClick(y,x,0)}
                    />) : null}
                    {workers[1] ? (
                        <div 
                        className='line east' 
                        style={{background: colorSelect(Number(workers[1].playerID)+10)}}
                        onClick={()=>handleTileClick(y,x,1)}
                    />) : null}
                    {workers[2] ? (
                        <div 
                        className='line south' 
                        style={{background: colorSelect(Number(workers[2].playerID)+10)}}
                        onClick={()=>handleTileClick(y,x,2)}
                    />) : null}
                    {workers[3] ? (
                        <div 
                        className='line west' 
                        style={{background: colorSelect(Number(workers[3].playerID)+10)}}
                        onClick={()=>handleTileClick(y,x,3)}
                    />) : null}
                </div>
            ) : (
            <div className='sq'>
                <div 
                    className='line north' 
                    style={{background: colorSelect(edgeArr[0])}}
                    onClick={()=>handleTileClick(y,x,0)}
                />
                <div 
                    className='line east' 
                    style={{background: colorSelect(edgeArr[1])}}
                    onClick={()=>handleTileClick(y,x,1)}
                />
                <div 
                    className='line south' 
                    style={{background: colorSelect(edgeArr[2])}}
                    onClick={()=>handleTileClick(y,x,2)}
                />
                <div 
                    className='line west' 
                    style={{background: colorSelect(edgeArr[3])}}
                    onClick={()=>handleTileClick(y,x,3)}
                />
            </div>
            )
        ) : (
            // General Tile Mode
            <button
                name={name}
                style={valid ? null : style}
                onClick={name ? handleModeToggle : ()=>handleTileClick(y,x)}
                className={valid ? "tile valid" : (name ? "tile active" :"tile")}
                data-y={y}
                data-x={x}
            >
                {workers ? (
                <div className='sq'>
                {workers[0] ? (
                    <div 
                        className='line north worker' 
                        style={{background: colorSelect(Number(workers[0].playerID)+10)}}
                    />) : null}
                {workers[1] ? (
                    <div 
                        className='line east worker' 
                        style={{background: colorSelect(Number(workers[1].playerID)+10)}}
                    />) : null}
                {workers[2] ? (
                    <div 
                        className='line south worker' 
                        style={{background: colorSelect(Number(workers[2].playerID)+10)}}
                    />) : null}
                {workers[3] ? (
                    <div 
                        className='line west worker' 
                        style={{background: colorSelect(Number(workers[3].playerID)+10)}}
                    />) : null}
                </div>
                ) : null }
            </button>
        )}
        </>
    )
}

export default Tile;