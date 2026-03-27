export type Lane = 0 | 1 | 2;

export interface EnemyCarType {
  id: string;
  lane: Lane;
  top: number;
  color: string;
}

export interface GameState {
  score: number;
  bestScore: number;
  speed: number;
  isStarted: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  playerLane: Lane;
  enemies: EnemyCarType[];
}