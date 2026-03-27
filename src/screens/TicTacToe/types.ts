export type Player = 'X' | 'O';
export type CellValue = Player | null;

export interface ScoreState {
  X: number;
  O: number;
  draw: number;
}