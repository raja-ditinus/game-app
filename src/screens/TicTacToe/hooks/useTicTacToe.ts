import { useCallback, useMemo, useState } from 'react';
import { calculateWinner, isBoardFull } from '../utils/ticTacToeHelpers';
import { CellValue, Player, ScoreState } from '../types';

const initialBoard: CellValue[] = Array(9).fill(null);

const initialScore: ScoreState = {
  X: 0,
  O: 0,
  draw: 0,
};

export function useTicTacToe() {
  const [board, setBoard] = useState<CellValue[]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [scores, setScores] = useState<ScoreState>(initialScore);

  const { winner, winningLine } = useMemo(
    () => calculateWinner(board),
    [board],
  );

  const isDraw = useMemo(
    () => !winner && isBoardFull(board),
    [board, winner],
  );

  const handleCellPress = useCallback(
    (index: number) => {
      if (board[index] || winner || isDraw) return;

      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer;

      const result = calculateWinner(updatedBoard);
      const draw = !result.winner && isBoardFull(updatedBoard);

      setBoard(updatedBoard);

    if (result.winner) {
  const winner = result.winner as 'X' | 'O';

  setScores(prev => ({
    ...prev,
    [winner]: prev[winner] + 1,
  }));

  return;
}

      if (draw) {
        setScores(prev => ({
          ...prev,
          draw: prev.draw + 1,
        }));
        return;
      }

      setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'));
    },
    [board, currentPlayer, winner, isDraw],
  );

  const restartRound = useCallback(() => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
  }, []);

  const resetMatch = useCallback(() => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setScores(initialScore);
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    scores,
    handleCellPress,
    restartRound,
    resetMatch,
  };
}