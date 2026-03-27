import { MAX_PULL_DISTANCE, POWER_MULTIPLIER, TARGET_RADIUS } from '../constants';
import { Point, ShotResult } from '../types';

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function getPullDistance(start: Point, current: Point): number {
  const dx = current.x - start.x;
  const dy = current.y - start.y;
  return clamp(Math.sqrt(dx * dx + dy * dy), 0, MAX_PULL_DISTANCE);
}

export function getArrowVelocity(start: Point, current: Point): Point {
  const dx = start.x - current.x;
  const dy = start.y - current.y;

  return {
    x: dx * POWER_MULTIPLIER,
    y: dy * POWER_MULTIPLIER,
  };
}

export function getArrowAngle(velocity: Point): number {
  return (Math.atan2(velocity.y, velocity.x) * 180) / Math.PI;
}

export function getShotResult(
  arrowX: number,
  arrowY: number,
  targetX: number,
  targetY: number,
): ShotResult {
  const dx = arrowX - targetX;
  const dy = arrowY - targetY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > TARGET_RADIUS) {
    return { hit: false, points: 0, perfect: false };
  }

  if (distance < 10) {
    return { hit: true, points: 100, perfect: true };
  }

  if (distance < 18) {
    return { hit: true, points: 70, perfect: false };
  }

  if (distance < 28) {
    return { hit: true, points: 50, perfect: false };
  }

  return { hit: true, points: 30, perfect: false };
}