function Rules() {

    return (
        <section className="page">
            <section className="rules subpage">
                <h3>How to Play</h3>
                <p>Every player gets 20 turns. On your turn, you will always place a tile as your first action. After, you have the choice of three options: Place a Worker, Remove a Worker, Send Worker to Market</p>
                <hr/>
                <h4>Place a Worker</h4>
                <p>Click a placed tile, and then select a quadrant to place it in.</p>
                <h4>Remove a Worker</h4>
                <p>Click a tile with a worker, and then select one of your own workers to remove. This will "harvest" a number of crop of the corresponding color based on the number of same-color quadrants connected to your worker.</p>
                <h4>Send Worker to Market</h4>
                <p>Select a color of crop to sell, and one of your workers will bring all of that crop type to market. This will be sold at the end of your following turn, giving 1 coin for each crop.</p>
                <h3>How to Win</h3>
                <p>The game ends either when there are no valid locations to place a tile, or when every player has played their 20 turns. Once that threshold is reached, whoever has the most coins is the winner.</p>
            </section>
        </section>
    )
}

export default Rules;