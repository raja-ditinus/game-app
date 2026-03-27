import {
  BALL_SIZE,
  BRICK_COLORS,
  BRICK_COLUMNS,
  BRICK_GAP,
  BRICK_HEIGHT,
  BRICK_ROWS,
  BRICK_SIDE_PADDING,
  BRICK_TOP_OFFSET,
  BRICK_WIDTH,
  GAME_HEIGHT,
  GAME_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_Y,
} from '../constants';
import { BallType, BrickType, PaddleType } from '../types';

export function createInitialBricks(level: number): BrickType[] {
  const bricks: BrickType[] = [];

  for (let row = 0; row < BRICK_ROWS; row += 1) {
    for (let col = 0; col < BRICK_COLUMNS; col += 1) {
      bricks.push({
        id: `${row}-${col}`,
        x: BRICK_SIDE_PADDING + col * (BRICK_WIDTH + BRICK_GAP),
        y: BRICK_TOP_OFFSET + row * (BRICK_HEIGHT + BRICK_GAP),
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT,
        color: BRICK_COLORS[row % BRICK_COLORS.length],
        visible: true,
        hitsLeft: row < Math.max(0, level - 1) ? 2 : 1,
      });
    }
  }

  return bricks;
}

export function createInitialBall(): BallType {
  return {
    x: GAME_WIDTH / 2 - BALL_SIZE / 2,
    y: PADDLE_Y - BALL_SIZE - 10,
    size: BALL_SIZE,
    dx: 3.2,
    dy: -4.2,
  };
}

export function createInitialPaddle(): PaddleType {
  return {
    x: GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
    y: PADDLE_Y,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
  };
}

export function clampPaddleX(x: number): number {
  if (x < 0) return 0;
  if (x > GAME_WIDTH - PADDLE_WIDTH) return GAME_WIDTH - PADDLE_WIDTH;
  return x;
}

export function checkPaddleCollision(ball: BallType, paddle: PaddleType): boolean {
  return (
    ball.y + ball.size >= paddle.y &&
    ball.y <= paddle.y + paddle.height &&
    ball.x + ball.size >= paddle.x &&
    ball.x <= paddle.x + paddle.width
  );
}

export function checkBrickCollision(ball: BallType, brick: BrickType): boolean {
  if (!brick.visible) return false;

  return (
    ball.x + ball.size >= brick.x &&
    ball.x <= brick.x + brick.width &&
    ball.y + ball.size >= brick.y &&
    ball.y <= brick.y + brick.height
  );
}

export function isBallOut(ball: BallType): boolean {
  return ball.y > GAME_HEIGHT;
}