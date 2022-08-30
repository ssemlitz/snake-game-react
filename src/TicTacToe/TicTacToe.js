import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState()
  const [tie, setTie] = useState()
  const [count, setCount] = useState(1)

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diag: [
        [0, 4, 8],
        [6, 4, 2],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === ''      
        ) {
          //do nothing here
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]])
        } else {
          if (count === 9 && winner === null) setTie('tie')
        }
      })
    }
  };
  
  const handleClick = (num) => {
    if (cells[num] !== "") return;

    let squares = [...cells];
    

    if (turn === "x") {
      squares[num] = turn;
      setTurn("o");
    } else {
      squares[num] = turn;
      setTurn("x"); 
    }
    
    setCount(count + 1)
    console.log(count)
    checkForWinner(squares);
    console.log(winner)
    setCells(squares);
  };

  const handleRestart = () => {
    setWinner(null)
    setTie(null)
    setCells(Array(9).fill(""))
    setCount(1)
  }

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  return (
    <div className="container">
      <table>
        Turn: {turn}
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {winner && (
        <>
        <p>{winner} is the winner!</p>
        <button onClick={() => handleRestart()}>Play Again</button>
        </>
      )}
      {tie && (
        <>
        <p>The game was a {tie}!</p>
        <button onClick={() => handleRestart()}>Play Again</button>
        </>
      )}
    </div>
  );
};

export default TicTacToe;
