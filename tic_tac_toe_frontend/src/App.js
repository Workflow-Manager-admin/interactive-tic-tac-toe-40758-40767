import React, { useState } from "react";
import "./App.css";

// Helper to check for win
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Main App for Tic Tac Toe. Implements two human players,
   * turn logic, win/draw detection, and restart functionality.
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const movesLeft = squares.some((s) => s === null);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!movesLeft) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  // PUBLIC_INTERFACE
  function handleSquareClick(i) {
    /** Handles clicking a square, places X or O accordingly. */
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    /** Resets the game board to empty */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="ttt-app-bg">
      <main className="ttt-main-container">
        <h1 className="ttt-title">
          Tic Tac Toe
        </h1>
        <div className="ttt-status" data-testid="game-status">
          {status}
        </div>
        <Board squares={squares} onClick={handleSquareClick} winner={winner} />
        <button
          className="ttt-restart-btn"
          onClick={handleRestart}
          aria-label="Restart game"
        >
          Restart
        </button>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function Board({ squares, onClick, winner }) {
  /**
   * Renders the 3x3 game board grid.
   */
  function renderSquare(i) {
    const highlight = winner &&
      (squares[i] === winner);
    return (
      <button
        className={`ttt-square${highlight ? " ttt-winner" : ""}`}
        onClick={() => onClick(i)}
        key={i}
        aria-label={`Place ${squares[i] ? squares[i] : "mark"} on position ${i}`}
        disabled={!!squares[i] || winner}
        tabIndex={0}
      >
        {squares[i]}
      </button>
    );
  }

  return (
    <div className="ttt-board">
      {[0, 1, 2].map((row) => (
        <div className="ttt-board-row" key={row}>
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}

export default App;
