import {
  BIRD_SIZE,
  GAME_BOTTOM,
  PIPE_WIDTH,
  PIPE_GAP,
  SCREEN_WIDTH,
} from '../constants';
import { PipeType } from '../types';

export function createPipe(id: string): PipeType {
  const minGapY = 150;
  const maxGapY = GAME_BOTTOM - 150;

return {
  id,
  x: SCREEN_WIDTH - 40,
  gapY: minGapY + Math.random() * (maxGapY - minGapY),
  passed: false,
};
}

export function didBirdHitGround(birdY: number): boolean {
  return birdY + BIRD_SIZE >= GAME_BOTTOM;
}

export function didBirdHitTop(birdY: number): boolean {
  return birdY <= 0;
}

export function didBirdHitPipe(
  birdX: number,
  birdY: number,
  birdSize: number,
  pipeX: number,
  pipeWidth: number,
  gapY: number,
): boolean {
  const birdRight = birdX + birdSize;
  const birdBottom = birdY + birdSize;

  const insidePipeX = birdRight > pipeX && birdX < pipeX + pipeWidth;
  if (!insidePipeX) return false;

  const gapTop = gapY - PIPE_GAP / 2;
  const gapBottom = gapY + PIPE_GAP / 2;

  return birdY < gapTop || birdBottom > gapBottom;
}

export function shouldIncreaseScore(
  pipeX: number,
  passed: boolean,
  birdX: number,
): boolean {
  return !passed && pipeX + PIPE_WIDTH < birdX;
}