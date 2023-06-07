import Tile from "../components/Tile"
import "../style.css"

export function CropGameBoard({ ctx, G, moves }) {
    const onClick = (y,x) => {
        moves.clickTile(y,x)
    };

    return (
        <section className="game">
            <section className="board">
                {G.cells.map((row,rowIndex) => 
                    row.map((tile,colIndex)=> (
                        <Tile
                        key={`${colIndex}-${rowIndex}`} 
                        y={rowIndex} 
                        x={colIndex} 
                        edgeArr={tile.edges}
                        valid={tile.valid}
                        onClick={onClick}
                        />
                    ))
                )}
            </section>
            <Tile 
                edgeArr={G.active}
            />
        </section>
    );
}