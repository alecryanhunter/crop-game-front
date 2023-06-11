import { useEffect } from "react";
import API from "../utils/API"

function EndScreen({coins, matchData}) {

    function winnerFinder(arr) {
        let bigNum = 0
        let winDex = 0
        const equal = arr.every(i => i === arr[0]);
        for (let i = 0;i<arr.length;i++) {
            if (arr[i] > bigNum){
                bigNum = arr[i]
                winDex = i
            }
        }
        if (equal) {
            return "Draw"
        }

        return `Player ${winDex=1} Wins!`;
    }

    useEffect(()=>{
        console.log(matchData);
        winnerFinder(coins);
    },[])

    return (
        <section className="game-over">
            <h3>GAME OVER</h3>
            <p>{winnerFinder(coins)}</p>
        </section>
    );
}

export default EndScreen;