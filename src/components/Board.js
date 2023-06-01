import Tile from "./Tile"

function Board({handleTile,board}) {


    return (
        <section className="board">
            {board.map((row,rowIndex) => 
                row.map((tile,colIndex)=> (
                    <Tile 
                        key={`${colIndex}-${rowIndex}`} 
                        x={colIndex} 
                        y={rowIndex} 
                        edgeArr={[]}
                        handleTile={handleTile}
                    />
                ))
            )}
        </section>
    )
}

export default Board;