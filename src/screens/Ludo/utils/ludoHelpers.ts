import { HOME_PATHS, COMMON_PATH, HOME_YARD_POSITIONS } from '../data/movementPaths';
import { CellPosition, PlayerColor, TokenType } from '../types';

export function getTokenBoardPosition(token: TokenType): CellPosition {
  if (token.step === -1) {
    const numberPart = Number(token.id.split('-')[1]) - 1;
    return HOME_YARD_POSITIONS[token.player][numberPart];
  }

  if (token.step >= 0 && token.step <= 51) {
    return COMMON_PATH[token.step];
  }

  const homeIndex = token.step - 52;
  return HOME_PATHS[token.player][homeIndex];
}

export function isTokenMovable(token: TokenType, diceValue: number): boolean {
  if (token.isFinished) return false;
  if (token.step === -1) return diceValue === 6;
  return token.step + diceValue <= 57;
}

export function getNextPlayer(current: PlayerColor): PlayerColor {
  const order: PlayerColor[] = ['red', 'green', 'yellow', 'blue'];
  const index = order.indexOf(current);
  return order[(index + 1) % order.length];
}

export function areSameCell(a: CellPosition, b: CellPosition): boolean {
  return a.row === b.row && a.col === b.col;
}