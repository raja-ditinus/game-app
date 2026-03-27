export interface Point {
  x: number;
  y: number;
}

export interface ArrowState {
  id: string;
  position: Point;
  velocity: Point;
  angle: number;
  active: boolean;
  hit: boolean;
}

export interface TargetState {
  x: number;
  y: number;
  radius: number;
  direction: 1 | -1;
  speed: number;
}

export interface ShotResult {
  points: number;
  perfect: boolean;
  hit: boolean;
}