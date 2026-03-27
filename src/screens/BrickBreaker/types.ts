export interface BrickType {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  visible: boolean;
  hitsLeft: number;
}

export interface BallType {
  x: number;
  y: number;
  size: number;
  dx: number;
  dy: number;
}

export interface PaddleType {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GameStats {
  score: number;
  lives: number;
  level: number;
  bestScore: number;
}