import React, { useState, useEffect } from "react";
import api from '../../api';

export default function Minesweeper() {
  const width = 10;
  const bombAmount = 20;
  const [squares, setSquares] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isGameOver && score > 0) {
      submitScore();
    }
  }, [isGameOver]);

  const submitScore = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      await api.post('/user-game-scores', {
        userId,
        gameId: 2, // Minesweeper id 2
        score
      });
      console.log('Score submitted:', score);
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  function createBoard(firstClickIndex = null) {
    let bombsArray = Array(bombAmount).fill("bomb");
    let emptyArray = Array(width * width - bombAmount).fill("empty");
    let gameArray = [...bombsArray, ...emptyArray];

    if (firstClickIndex !== null) {
      gameArray = gameArray.filter((_, index) => index !== firstClickIndex);
      gameArray.sort(() => Math.random() - 0.5);
      gameArray.splice(firstClickIndex, 0, "empty");
    } else {
      gameArray.sort(() => Math.random() - 0.5);
    }

    const squares = gameArray.map((type, index) => ({
      id: index,
      type,
      revealed: false,
      flagged: false,
      neighborCount: 0
    }));

    // Calculate neighbor counts
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].type === "empty") {
        let count = 0;
        const isLeftEdge = i % width === 0;
        const isRightEdge = i % width === width - 1;

        if (squares[i - 1] && !isLeftEdge && squares[i - 1].type === "bomb") count++;
        if (squares[i + 1] && !isRightEdge && squares[i + 1].type === "bomb") count++;
        if (squares[i - width - 1] && !isLeftEdge && squares[i - width - 1].type === "bomb") count++;
        if (squares[i - width] && squares[i - width].type === "bomb") count++;
        if (squares[i - width + 1] && !isRightEdge && squares[i - width + 1].type === "bomb") count++;
        if (squares[i + width - 1] && !isLeftEdge && squares[i + width - 1].type === "bomb") count++;
        if (squares[i + width] && squares[i + width].type === "bomb") count++;
        if (squares[i + width + 1] && !isRightEdge && squares[i + width + 1].type === "bomb") count++;

        squares[i].neighborCount = count;
      }
    }

    setSquares(squares);
  }

  function revealSquare(index) {
    if (isGameOver || squares[index].flagged) return;

    if (!gameStarted) {
      setGameStarted(true);
      createBoard(index);
      // Need to get the updated squares after createBoard
      setTimeout(() => {
        const newSquares = [...squares];
        newSquares[index].revealed = true;
        setSquares(newSquares);
        checkForWin(newSquares);
      }, 0);
      return;
    }

    const newSquares = [...squares];
    newSquares[index].revealed = true;

    if (newSquares[index].type === "bomb") {
      gameOver();
      return;
    }

    if (newSquares[index].neighborCount === 0) {
      // Reveal adjacent squares
      const isLeftEdge = index % width === 0;
      const isRightEdge = index % width === width - 1;

      setTimeout(() => {
        if (index > 0 && !isLeftEdge && !newSquares[index - 1].revealed) revealSquare(index - 1);
        if (index < width * width - 1 && !isRightEdge && !newSquares[index + 1].revealed) revealSquare(index + 1);
        if (index > width && !newSquares[index - width].revealed) revealSquare(index - width);
        if (index > width - 1 && !isRightEdge && !newSquares[index - width + 1].revealed) revealSquare(index - width + 1);
        if (index < width * width - width && !isLeftEdge && !newSquares[index + width - 1].revealed) revealSquare(index + width - 1);
        if (index < width * width - width && !newSquares[index + width].revealed) revealSquare(index + width);
        if (index < width * width - width - 1 && !isRightEdge && !newSquares[index + width + 1].revealed) revealSquare(index + width + 1);
      }, 10);
    }

    setSquares(newSquares);
    checkForWin(newSquares);
  }

  function addFlag(index, e) {
    e.preventDefault();
    if (isGameOver || squares[index].revealed) return;

    const newSquares = [...squares];
    newSquares[index].flagged = !newSquares[index].flagged;
    setSquares(newSquares);
  }

  function checkForWin(squares) {
    const revealedSquares = squares.filter(square => square.revealed && square.type !== "bomb");
    const totalEmptySquares = squares.filter(square => square.type === "empty");

    if (revealedSquares.length === totalEmptySquares.length) {
      setScore(prev => prev + 1000); // Bonus for winning
      setIsGameOver(true);
      alert("Поздравляем! Вы выиграли!");
    }
  }

  function gameOver() {
    const newSquares = squares.map(square => ({
      ...square,
      revealed: square.type === "bomb" ? true : square.revealed
    }));

    setSquares(newSquares);
    setIsGameOver(true);
    alert("Игра окончена! Вы наступили на мину!");
  }

  function resetGame() {
    setSquares([]);
    setIsGameOver(false);
    setGameStarted(false);
    setScore(0);
    createBoard();
  }

  function renderSquare(square, index) {
    let content = "";
    let backgroundColor = square.revealed
      ? square.type === "bomb"
        ? "#FF0000"
        : "#172A45"
      : "#0A192F";

    if (square.revealed) {
      if (square.type === "bomb") {
        content = "💣";
      } else if (square.neighborCount > 0) {
        content = square.neighborCount;
      }
    } else if (square.flagged) {
      content = "🚩";
    }

    return (
      <div
        key={index}
        style={{
          width: "30px",
          height: "30px",
          backgroundColor,
          border: "1px solid #00FFAA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#00FFAA"
        }}
        onClick={() => revealSquare(index)}
        onContextMenu={(e) => addFlag(index, e)}
      >
        {content}
      </div>
    );
  }

  useEffect(() => {
    createBoard();
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#0A192F",
      padding: "20px",
      color: "#FFFFFF"
    }}>
      <h1 style={{
        color: "#00FFAA",
        marginBottom: "20px",
        textAlign: "center",
        textShadow: "0 0 5px #00FFAA"
      }}>
        Сапёр
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${width}, 30px)`,
        gridTemplateRows: `repeat(${width}, 30px)`,
        gap: "2px",
        backgroundColor: "#00FFAA",
        padding: "5px",
        borderRadius: "5px",
        marginBottom: "20px",
        border: "3px solid #00FFAA"
      }}>
        {squares.map((square, index) => renderSquare(square, index))}
      </div>

      <div style={{
        marginBottom: "20px",
        textAlign: "center",
        color: "#00FFAA"
      }}>
        <p>Левый клик - открыть клетку</p>
        <p>Правый клик - поставить флажок</p>
      </div>

      {isGameOver && (
        <button
          onClick={resetGame}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0A192F",
            color: "#00FFAA",
            border: "2px solid #00FFAA",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "all 0.3s ease"
          }}
        >
          Новая игра
        </button>
      )}

      {!gameStarted && !isGameOver && (
        <div style={{
          backgroundColor: "rgba(10, 25, 47, 0.7)",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "10px",
          textAlign: "center",
          border: "1px solid #00FFAA",
          color: "#00FFAA"
        }}>
          <p>Нажмите на любую клетку, чтобы начать игру</p>
          <p>Число показывает количество мин в соседних клетках</p>
        </div>
      )}
    </div>
  );
}