import Tile from "../components/Tile"
import "../style.css"

export function CropGameBoard({ ctx, G, moves }) {
    const onClick = (y,x) => {
        moves.clickTile(y,x)
    };

    return (
        <section className="game">
            <section className="board">
                {G.tiles.map((row,rowIndex) => 
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
            <info>
                <Tile 
                    edgeArr={G.active.edges}
                />
                <section>
                    <h3>Red Score: {G.score[0]}</h3>
                    <h3>Blue Score: {G.score[1]}</h3>
                </section>
            </info>
        </section>
    );
}