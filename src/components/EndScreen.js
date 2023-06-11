import { useEffect } from "react";
import API from "../utils/API"

import "../assets/styles/Game.css"

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
            return -1
        }

        return winDex;
    }

    useEffect(()=>{
        const winner = winnerFinder(coins);
        for (let i = 0;i<matchData.length;i++) {
            if (i === winner){
                API.updateStats(matchData[i].name,"wins",coins[i])
            } else {
                API.updateStats(matchData[i].name,"losses",coins[i])
            }
        }
    },[])

    return (
        <section className="game-over">
            <h3>GAME OVER</h3>
            {winnerFinder(coins) === -1 ? (
                <>
                <p>The game ended in a draw...</p>
                {[...Array(coins.length)].map((e,i)=> (
                    <p key={i}><span className="player-name">{matchData[i].name}</span> earned {coins[i]} coins.</p>
                ))}
                </>
            ) : (
                <>
                <p><span className="player-name">{matchData[winnerFinder(coins)].name}</span> won the game, earning {coins[winnerFinder(coins)]} coins.</p>
                {[...Array(coins.length)].map((e,i)=> (
                    (i === winnerFinder(coins) ? null : (
                        <p key={i}><span className="player-name">{matchData[i].name}</span> lost, earning {coins[i]} coins.</p>
                ))))}
                </>
            )}
        </section>
    );
}

export default EndScreen;