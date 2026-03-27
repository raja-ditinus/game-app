import { GRID_SIZE } from '../constants';
import { Direction, Point } from '../types';

export function getNextHead(head: Point, direction: Direction): Point {
  switch (direction) {
    case 'UP':
      return { x: head.x, y: head.y - 1 };
    case 'DOWN':
      return { x: head.x, y: head.y + 1 };
    case 'LEFT':
      return { x: head.x - 1, y: head.y };
    case 'RIGHT':
      return { x: head.x + 1, y: head.y };
    default:
      return head;
  }
}

export function isOppositeDirection(current: Direction, next: Direction): boolean {
  return (
    (current === 'UP' && next === 'DOWN') ||
    (current === 'DOWN' && next === 'UP') ||
    (current === 'LEFT' && next === 'RIGHT') ||
    (current === 'RIGHT' && next === 'LEFT')
  );
}

export function isWallCollision(point: Point): boolean {
  return point.x < 0 || point.y < 0 || point.x >= GRID_SIZE || point.y >= GRID_SIZE;
}

export function isSelfCollision(head: Point, snake: Point[]): boolean {
  return snake.some(item => item.x === head.x && item.y === head.y);
}

export function getRandomFoodPosition(snake: Point[]): Point {
  const snakeSet = new Set(snake.map(item => `${item.x}-${item.y}`));

  while (true) {
    const point = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    if (!snakeSet.has(`${point.x}-${point.y}`)) {
      return point;
    }
  }
}