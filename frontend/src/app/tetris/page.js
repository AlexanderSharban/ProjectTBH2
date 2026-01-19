import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api';

const COLS = 6;
const ROWS = 17;
const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1, 1], [1, 0, 0]], // L
  [[1, 1, 1], [0, 0, 1]], // J
  [[1, 1, 0], [0, 1, 1]], // Z
  [[0, 1, 1], [1, 1, 0]]  // S
];

function createEmptyBoard() {
  return Array(ROWS).fill().map(() => Array(COLS).fill(0));
}

export default function TetrisGame() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [currentPos, setCurrentPos] = useState({x: 0, y: 0});
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (gameOver && score > 0) {
      submitScore();
    }
  }, [gameOver]); // eslint-disable-line react-hooks/exhaustive-deps

  const submitScore = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Декодируем токен для получения userId (простой способ, без jwt-decode)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      await api.post('/user-game-scores', {
        userId,
        gameId: 1, // Предположим, Tetris имеет id 1
        score
      });
      console.log('Score submitted:', score);
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  const spawnRandomPiece = useCallback(() => {
    const pieceIndex = Math.floor(Math.random() * SHAPES.length);
    const newPiece = {
      shape: SHAPES[pieceIndex],
      width: SHAPES[pieceIndex][0].length,
      height: SHAPES[pieceIndex].length
    };
    const startX = Math.floor((COLS - newPiece.width) / 2);
    const startY = -newPiece.height + 1; // Начинаем выше поля

    // Проверка на проигрыш (если после спавна фигура сразу сталкивается)
    if (checkCollision(newPiece, {x: startX, y: startY})) {
      setGameOver(true);
      return;
    }

    setCurrentPiece(newPiece);
    setCurrentPos({x: startX, y: startY});
  }, []);

  const checkCollision = (piece, pos) => {
    for (let y = 0; y < piece.height; y++) {
      for (let x = 0; x < piece.width; x++) {
        if (piece.shape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;

          if (newX < 0 || newX >= COLS || newY >= ROWS) {
            return true;
          }

          if (newY >= 0 && board[newY][newX]) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const placePiece = () => {
    const newBoard = board.map(row => [...row]);
    for (let y = 0; y < currentPiece.height; y++) {
      for (let x = 0; x < currentPiece.width; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPos.y + y;
          const boardX = currentPos.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = 1;
          }
        }
      }
    }
    setBoard(newBoard);
    clearLines(newBoard);
    spawnRandomPiece();
  };

  const clearLines = (board) => {
    const newBoard = board.filter(row => row.some(cell => cell === 0));
    const linesCleared = ROWS - newBoard.length;
    const emptyRows = Array(linesCleared).fill().map(() => Array(COLS).fill(0));
    const finalBoard = [...emptyRows, ...newBoard];
    setBoard(finalBoard);
    setScore(prev => prev + linesCleared * 100);
  };

  const movePiece = (dx, dy) => {
    if (!currentPiece || gameOver || isPaused) return;

    const newPos = {x: currentPos.x + dx, y: currentPos.y + dy};

    if (!checkCollision(currentPiece, newPos)) {
      setCurrentPos(newPos);
    } else if (dy > 0) {
      // Если не можем двигаться вниз, размещаем фигуру
      placePiece();
    }
  };

  const rotatePiece = () => {
    if (!currentPiece || gameOver || isPaused) return;

    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );

    const newPiece = {
      shape: rotated,
      width: rotated[0].length,
      height: rotated.length
    };

    // Корректировка позиции при повороте у границ
    let newX = currentPos.x;
    if (currentPos.x + newPiece.width > COLS) {
      newX = COLS - newPiece.width;
    }

    if (!checkCollision(newPiece, {x: newX, y: currentPos.y})) {
      setCurrentPiece(newPiece);
      setCurrentPos(pos => ({...pos, x: newX}));
    }
  };

  const dropPiece = () => {
    if (!currentPiece || gameOver || isPaused) return;

    let newY = currentPos.y;
    while (!checkCollision(currentPiece, {x: currentPos.x, y: newY + 1})) {
      newY++;
    }
    setCurrentPos(pos => ({...pos, y: newY}));
    placePiece();
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPiece(null);
    setCurrentPos({x: 0, y: 0});
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    spawnRandomPiece();
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          movePiece(0, 1);
          break;
        case 'ArrowUp':
          rotatePiece();
          break;
        case ' ':
          e.preventDefault();
          dropPiece();
          break;
        case 'p':
        case 'P':
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPiece, currentPos, gameOver, isPaused]);

  useEffect(() => {
    if (!currentPiece && !gameOver) {
      spawnRandomPiece();
    }
  }, [currentPiece, gameOver, spawnRandomPiece]);

  useEffect(() => {
    if (!gameOver && !isPaused && currentPiece) {
      const interval = setInterval(() => {
        movePiece(0, 1);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [currentPiece, currentPos, gameOver, isPaused]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);

    if (currentPiece) {
      for (let y = 0; y < currentPiece.height; y++) {
        for (let x = 0; x < currentPiece.width; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPos.y + y;
            const boardX = currentPos.x + x;
            if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
              displayBoard[boardY][boardX] = 2; // Текущая фигура
            }
          }
        }
      }
    }

    return displayBoard.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={x}
            className={`w-6 h-6 border border-gray-600 ${
              cell === 1 ? 'bg-[#00FFAA]' : cell === 2 ? 'bg-[#00FFCC]' : 'bg-gray-900'
            }`}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A192F] text-[#00FFAA] p-4">
      <h1 className="text-4xl font-bold mb-8">TETRIS</h1>

      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <div className="border-2 border-[#00FFAA] p-2 bg-black">
            {renderBoard()}
          </div>

          <div className="mt-4 text-center">
            <p className="text-xl">Score: {score}</p>
            {gameOver && <p className="text-red-500 mt-2">Game Over!</p>}
            {isPaused && <p className="text-yellow-500 mt-2">Paused</p>}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-[#00FFAA] text-black font-bold rounded hover:bg-[#00FFCC]"
            >
              New Game
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-4 py-2 bg-[#00FFAA] text-black font-bold rounded hover:bg-[#00FFCC]"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
        </div>

        <div className="text-sm max-w-xs">
          <h3 className="text-lg font-bold mb-2">Controls:</h3>
          <p>← → : Move</p>
          <p>↓ : Soft Drop</p>
          <p>↑ : Rotate</p>
          <p>Space : Hard Drop</p>
          <p>P : Pause</p>
        </div>
      </div>
    </div>
  );
}
