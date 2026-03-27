export type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';

export interface CellPosition {
  row: number;
  col: number;
}

export interface TokenType {
  id: string;
  player: PlayerColor;
  step: number; // -1 means inside home
  isFinished: boolean;
}

export interface PlayerState {
  color: PlayerColor;
  tokens: TokenType[];
  finishedCount: number;
}

export interface LudoState {
  currentPlayer: PlayerColor;
  diceValue: number;
  players: Record<PlayerColor, PlayerState>;
  winner: PlayerColor | null;
  isRolling: boolean;
  turnLocked: boolean;
}