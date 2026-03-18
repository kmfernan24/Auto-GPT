export const BOARD_WIDTH = 20;
export const BOARD_HEIGHT = 14;
export const MINE_COUNT = 42;

export interface Cell {
  hasMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

export function createEmptyBoard() {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => ({
      hasMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    })),
  );
}

export function forEachNeighbor(
  row: number,
  col: number,
  visitor: (nextRow: number, nextCol: number) => void,
) {
  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
      if (rowOffset === 0 && colOffset === 0) {
        continue;
      }

      const nextRow = row + rowOffset;
      const nextCol = col + colOffset;
      const isInBounds =
        nextRow >= 0 &&
        nextRow < BOARD_HEIGHT &&
        nextCol >= 0 &&
        nextCol < BOARD_WIDTH;

      if (isInBounds) {
        visitor(nextRow, nextCol);
      }
    }
  }
}

export function seedBoard(initialRow: number, initialCol: number) {
  const board = createEmptyBoard();
  const safeZone = new Set<string>();

  forEachNeighbor(initialRow, initialCol, (row, col) => {
    safeZone.add(`${row},${col}`);
  });
  safeZone.add(`${initialRow},${initialCol}`);

  let minesPlaced = 0;
  while (minesPlaced < MINE_COUNT) {
    const row = Math.floor(Math.random() * BOARD_HEIGHT);
    const col = Math.floor(Math.random() * BOARD_WIDTH);
    const key = `${row},${col}`;

    if (safeZone.has(key) || board[row][col].hasMine) {
      continue;
    }

    board[row][col].hasMine = true;
    minesPlaced += 1;
  }

  for (let row = 0; row < BOARD_HEIGHT; row += 1) {
    for (let col = 0; col < BOARD_WIDTH; col += 1) {
      if (board[row][col].hasMine) {
        continue;
      }

      let nearby = 0;
      forEachNeighbor(row, col, (neighborRow, neighborCol) => {
        if (board[neighborRow][neighborCol].hasMine) {
          nearby += 1;
        }
      });

      board[row][col].adjacentMines = nearby;
    }
  }

  return board;
}

export function revealFloodFill(
  board: Cell[][],
  startRow: number,
  startCol: number,
) {
  const queue: Array<[number, number]> = [[startRow, startCol]];

  while (queue.length > 0) {
    const [row, col] = queue.shift() as [number, number];
    const current = board[row][col];

    if (current.isRevealed || current.isFlagged) {
      continue;
    }

    current.isRevealed = true;

    if (current.adjacentMines !== 0) {
      continue;
    }

    forEachNeighbor(row, col, (neighborRow, neighborCol) => {
      const neighbor = board[neighborRow][neighborCol];
      if (!neighbor.isRevealed && !neighbor.hasMine) {
        queue.push([neighborRow, neighborCol]);
      }
    });
  }
}

export function cloneBoard(board: Cell[][]) {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

export function countRevealedSafeCells(board: Cell[][]) {
  return board.flat().filter((cell) => cell.isRevealed && !cell.hasMine).length;
}
