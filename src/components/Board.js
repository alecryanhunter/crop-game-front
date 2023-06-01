import Tile from "./Tile"

function Board({handleTile,board}) {

    return (
        <section className="board">
            {board.map((row,rowIndex) => 
                row.map((tile,colIndex)=> (
                    <Tile
                        key={`${colIndex}-${rowIndex}`} 
                        y={rowIndex} 
                        x={colIndex} 
                        edgeArr={tile.edges}
                        valid={tile.valid}
                        handleTile={handleTile}
                    />
                ))
            )}
        </section>
    )
}

export default Board;