import { useCallback, useMemo, useState } from 'react';
import {
  createInitialPlayers,
  PLAYER_COLORS,
  SAFE_STEPS,
  START_STEP,
} from '../constants';
import { getNextPlayer, isTokenMovable } from '../utils/ludoHelpers';
import { LudoState, PlayerColor, TokenType } from '../types';

const INITIAL_STATE: LudoState = {
  currentPlayer: 'red',
  diceValue: 1,
  players: createInitialPlayers(),
  winner: null,
  isRolling: false,
  turnLocked: false,
};

export function useLudoGame() {
  const [state, setState] = useState<LudoState>(INITIAL_STATE);

  const rollDice = useCallback(() => {
    if (state.turnLocked || state.winner || state.isRolling) return;

    setState(prev => ({ ...prev, isRolling: true }));

    setTimeout(() => {
      const value = Math.floor(Math.random() * 6) + 1;

      setState(prev => ({
        ...prev,
        diceValue: value,
        isRolling: false,
        turnLocked: true,
      }));
    }, 350);
  }, [state.turnLocked, state.winner, state.isRolling]);

  const canMoveToken = useCallback(
    (token: TokenType) => isTokenMovable(token, state.diceValue),
    [state.diceValue],
  );

  const movableTokens = useMemo(() => {
    const tokens = state.players[state.currentPlayer].tokens;
    return tokens.filter(token => canMoveToken(token));
  }, [state.currentPlayer, state.players, canMoveToken]);

  const sendKilledTokensHome = (
    players: LudoState['players'],
    currentPlayer: PlayerColor,
    targetStep: number,
  ) => {
    if (SAFE_STEPS.includes(targetStep)) return players;

    const updatedPlayers = { ...players };

    PLAYER_COLORS.forEach(color => {
      if (color === currentPlayer) return;

      updatedPlayers[color] = {
        ...updatedPlayers[color],
        tokens: updatedPlayers[color].tokens.map(token => {
          if (token.step === targetStep && !token.isFinished) {
            return { ...token, step: -1 };
          }
          return token;
        }),
      };
    });

    return updatedPlayers;
  };

  const moveToken = useCallback(
    (tokenId: string) => {
      if (!state.turnLocked || state.winner) return;

      const activePlayer = state.players[state.currentPlayer];
      const token = activePlayer.tokens.find(item => item.id === tokenId);

      if (!token || !canMoveToken(token)) return;

      setState(prev => {
        const currentPlayer = prev.currentPlayer;
        const players = { ...prev.players };
        const playerState = players[currentPlayer];

        let movedToStep = -1;
        const getsExtraTurn = prev.diceValue === 6;

        const updatedTokens = playerState.tokens.map(item => {
          if (item.id !== tokenId) return item;

          if (item.step === -1 && prev.diceValue === 6) {
            movedToStep = START_STEP[currentPlayer];
            return { ...item, step: movedToStep };
          }

          const nextStep = item.step + prev.diceValue;

          if (nextStep === 57) {
            movedToStep = nextStep;
            return { ...item, step: nextStep, isFinished: true };
          }

          movedToStep = nextStep;
          return { ...item, step: nextStep };
        });

        players[currentPlayer] = {
          ...playerState,
          tokens: updatedTokens,
          finishedCount: updatedTokens.filter(item => item.isFinished).length,
        };

        const finalPlayers =
          movedToStep >= 0
            ? sendKilledTokensHome(players, currentPlayer, movedToStep)
            : players;

        const winner =
          finalPlayers[currentPlayer].finishedCount === 4
            ? currentPlayer
            : null;

        const noMoveAvailable =
          movableTokens.length === 0 && prev.diceValue !== 6;

        return {
          ...prev,
          players: finalPlayers,
          winner,
          turnLocked: false,
          currentPlayer:
            winner || getsExtraTurn
              ? currentPlayer
              : getNextPlayer(currentPlayer),
          diceValue: noMoveAvailable ? 1 : prev.diceValue,
        };
      });
    },
    [state.turnLocked, state.winner, state.players, state.currentPlayer, canMoveToken, movableTokens.length],
  );

  const skipTurnIfNoMove = useCallback(() => {
    if (!state.turnLocked || state.winner) return;
    if (movableTokens.length > 0) return;

    setState(prev => ({
      ...prev,
      turnLocked: false,
      currentPlayer: prev.diceValue === 6 ? prev.currentPlayer : getNextPlayer(prev.currentPlayer),
    }));
  }, [state.turnLocked, state.winner, movableTokens.length]);

  const resetGame = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    ...state,
    movableTokens,
    rollDice,
    moveToken,
    skipTurnIfNoMove,
    resetGame,
  };
}