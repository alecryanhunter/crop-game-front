import Tile from "./Tile"

function Board() {
    function handleTile() {
        console.log("tile clicked")
    }

    return (
        <section>
            <Tile onClick={handleTile}/>
            <Tile onClick={handleTile}/>
            <Tile onClick={handleTile}/>
            <Tile onClick={handleTile}/>
            <Tile onClick={handleTile}/>
        </section>
    )
}

export default Board;