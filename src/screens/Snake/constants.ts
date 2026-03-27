import { Direction, Point } from './types';

export const GRID_SIZE = 18;
export const CELL_SIZE = 18;
export const INITIAL_SPEED = 250;
export const MIN_SPEED = 80;
export const SPEED_STEP = 5;
export const BEST_SCORE_KEY = 'snake_best_score';

export const INITIAL_DIRECTION: Direction = 'RIGHT';

export const INITIAL_SNAKE: Point[] = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
];