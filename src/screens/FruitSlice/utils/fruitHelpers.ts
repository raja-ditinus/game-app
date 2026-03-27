import {
  FRUIT_RADIUS,
  NORMAL_FRUITS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../constants';
import { FruitKind, FruitType, SlashPoint } from '../types';

export function randomFruitKind(): FruitKind {
  const isBomb = Math.random() < 0.14;
  if (isBomb) return 'bomb';
  return NORMAL_FRUITS[Math.floor(Math.random() * NORMAL_FRUITS.length)];
}

export function createFruit(id: string): FruitType {
  const x = 40 + Math.random() * (SCREEN_WIDTH - 80);
  const y = SCREEN_HEIGHT + 20;

  return {
    id,
    kind: randomFruitKind(),
    x,
    y,
    vx: (Math.random() - 0.5) * 5,
    vy: -(10 + Math.random() * 7),
    rotation: Math.random() * 360,
    sliced: false,
    radius: FRUIT_RADIUS,
  };
}

export function distance(a: SlashPoint, b: SlashPoint): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function isPointNearFruit(point: SlashPoint, fruit: FruitType): boolean {
  return distance(point, { x: fruit.x, y: fruit.y }) <= fruit.radius + 12;
}

function distancePointToSegment(
  point: SlashPoint,
  start: SlashPoint,
  end: SlashPoint,
): number {
  const A = point.x - start.x;
  const B = point.y - start.y;
  const C = end.x - start.x;
  const D = end.y - start.y;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;

  let param = -1;
  if (lenSq !== 0) {
    param = dot / lenSq;
  }

  let xx: number;
  let yy: number;

  if (param < 0) {
    xx = start.x;
    yy = start.y;
  } else if (param > 1) {
    xx = end.x;
    yy = end.y;
  } else {
    xx = start.x + param * C;
    yy = start.y + param * D;
  }

  const dx = point.x - xx;
  const dy = point.y - yy;

  return Math.sqrt(dx * dx + dy * dy);
}

export function didSlashHitFruit(
  path: SlashPoint[],
  fruit: FruitType,
): boolean {
  if (path.length === 0) return false;

  if (path.length === 1) {
    return isPointNearFruit(path[0], fruit);
  }

  for (let i = 1; i < path.length; i += 1) {
    const start = path[i - 1];
    const end = path[i];
    const dist = distancePointToSegment(
      { x: fruit.x, y: fruit.y },
      start,
      end,
    );

    if (dist <= fruit.radius + 14) {
      return true;
    }
  }

  return false;
}