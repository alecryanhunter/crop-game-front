function Tile({value,onClick}) {
    return (
        <button
            onClick={onClick}
            className="tile"
        >{value}</button>
    )
}

export default Tile;