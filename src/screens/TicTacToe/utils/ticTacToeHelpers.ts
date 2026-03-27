import { WIN_PATTERNS } from '../constants';
import { CellValue, Player } from '../types';

export function calculateWinner(board: CellValue[]): {
  winner: Player | null;
  winningLine: number[];
} {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return {
        winner: board[a] as Player,
        winningLine: pattern,
      };
    }
  }

  return {
    winner: null,
    winningLine: [],
  };
}

export function isBoardFull(board: CellValue[]): boolean {
  return board.every(cell => cell !== null);
}