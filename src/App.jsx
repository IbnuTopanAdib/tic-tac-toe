import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import { useState } from "react";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winningCombination";

function deriveActivePlayer(gameTurns) {
  let currPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currPlayer = 'O';
  }

  return currPlayer
}

function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X: "Player1",
    O: "Player2"
  });
  const activePlayer = deriveActivePlayer(gameTurns);

  const initGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];


  let gameBoard = [...initGameBoard.map(innerGameboard => [...innerGameboard])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
      break;
    }
  }
  const hasDraw = gameTurns.length === 9;


  function handleSelectSquare(rowIndex, colIndex) {

    setGameTurns(prevGameTurns => {

      const currPlayer = deriveActivePlayer(prevGameTurns);
      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currPlayer,
        },
        ...prevGameTurns
      ];

      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Ibnu Topan" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName="Inu Waluyo" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        <Log turns={gameTurns} />
      </div>
    </main>
  )
}

export default App
