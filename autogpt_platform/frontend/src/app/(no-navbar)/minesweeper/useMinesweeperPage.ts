import { useState } from "react";

import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  MINE_COUNT,
  cloneBoard,
  countRevealedSafeCells,
  createEmptyBoard,
  revealFloodFill,
  seedBoard,
} from "./helpers";

type GameStatus = "playing" | "won" | "lost";

export function useMinesweeperPage() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [isBoardSeeded, setIsBoardSeeded] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  const revealedSafeCells = countRevealedSafeCells(board);
  const totalSafeCells = BOARD_HEIGHT * BOARD_WIDTH - MINE_COUNT;
  const remainingMines =
    MINE_COUNT - board.flat().filter((cell) => cell.isFlagged).length;

  function resetGame() {
    setBoard(createEmptyBoard());
    setIsBoardSeeded(false);
    setGameStatus("playing");
  }

  function revealAllMines(nextBoard: ReturnType<typeof createEmptyBoard>) {
    nextBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell.hasMine) {
          cell.isRevealed = true;
        }
      });
    });
  }

  function revealCell(row: number, col: number) {
    if (gameStatus !== "playing") {
      return;
    }

    setBoard((currentBoard) => {
      const seededBoard = isBoardSeeded ? currentBoard : seedBoard(row, col);
      const nextBoard = cloneBoard(seededBoard);
      const targetCell = nextBoard[row][col];

      if (targetCell.isFlagged || targetCell.isRevealed) {
        return nextBoard;
      }

      if (targetCell.hasMine) {
        targetCell.isRevealed = true;
        revealAllMines(nextBoard);
        setGameStatus("lost");
        setIsBoardSeeded(true);
        return nextBoard;
      }

      revealFloodFill(nextBoard, row, col);

      const visibleSafeCells = countRevealedSafeCells(nextBoard);
      if (visibleSafeCells === totalSafeCells) {
        setGameStatus("won");
      }

      setIsBoardSeeded(true);
      return nextBoard;
    });
  }

  function toggleFlag(row: number, col: number) {
    if (gameStatus !== "playing") {
      return;
    }

    setBoard((currentBoard) => {
      const nextBoard = cloneBoard(currentBoard);
      const targetCell = nextBoard[row][col];

      if (targetCell.isRevealed) {
        return nextBoard;
      }

      targetCell.isFlagged = !targetCell.isFlagged;
      return nextBoard;
    });
  }

  return {
    board,
    gameStatus,
    remainingMines,
    revealedSafeCells,
    totalSafeCells,
    revealCell,
    resetGame,
    toggleFlag,
  };
}
