import Tile from "./Tile"

function Board({setActive,tileGeneration}) {

    function generateBoard(rows, cols, item) {
        return Array(rows)
            .fill()
            .map(()=>
                Array(cols)
                .fill()
                .map(item)
            )
    }

    const board = generateBoard(5,5,()=>[]);

    return (
        <section className="board">
            {board.map((row,rowIndex) => 
                row.map((tile,colIndex)=> (
                    <Tile 
                        key={`${colIndex}-${rowIndex}`} 
                        x={colIndex} 
                        y={rowIndex} 
                        edgeArr={[0,0,0,0]}
                        setActive={setActive}
                        tileGen={tileGeneration}
                        />
                ))
            )}
        </section>
    )
}

export default Board;