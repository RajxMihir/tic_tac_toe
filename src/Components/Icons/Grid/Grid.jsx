import { useState } from "react";
import Card from "../../../Card/Card";
import './Grid.css';
import isWinner from "../../../helpers/checkWinner";

function Grid({numberOfCards}) {
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true); // true = 0, false = X
    const [winner, setWinner] = useState(null);

    function play(index) {
        if(turn == true) {
            board[index] = '0';
        }
        else {
            board[index] = 'X';
        }
        const win = isWinner(board, turn ? "0" : "X");
        if(win) {
            setWinner(win);
        }
        setBoard([...board]);
        setTurn(!turn);
    }
    function reset() {
        setTurn(turn);
        setWinner(null);
        setBoard(Array(numberOfCards).fill(""))
    }

    return (
        <div className="grid-wrapper">
            {
                winner && (
                    <>
                        <h1 className="turn-highlight">Winner is {winner}</h1>
                        <button className="reset" onClick={reset}> Reset Game</button>
                    </>
                )
            }
            <h1 className="turn-highlight">Current turn: {(turn) ? '0' : 'X'}</h1>
            <div className="grid">
            {board.map((el, idx) => <Card gameEnd={winner ? true : false} key={idx} onPlay={play} player={el} index={idx} />)}
            </div>
        </div>
    )
}

export default Grid;