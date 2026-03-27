import {
  BULLET_HEIGHT,
  ENEMY_HEIGHT,
  ENEMY_WIDTH,
  PLAYER_WIDTH,
  SCREEN_WIDTH,
} from '../constants';
import { BulletType, EnemyType } from '../types';

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function createEnemy(id: string): EnemyType {
  const x = Math.random() * (SCREEN_WIDTH - ENEMY_WIDTH);

  return {
    id,
    x,
    y: -ENEMY_HEIGHT,
    active: true,
    speed: 2.5 + Math.random() * 2,
  };
}

export function createBullet(
  id: string,
  playerX: number,
  playerY: number,
): BulletType {
  return {
    id,
    x: playerX + PLAYER_WIDTH / 2 - 3,
    y: playerY - BULLET_HEIGHT,
    active: true,
  };
}

export function isBulletHitEnemy(
  bullet: BulletType,
  enemy: EnemyType,
): boolean {
  return (
    bullet.x < enemy.x + ENEMY_WIDTH &&
    bullet.x + 6 > enemy.x &&
    bullet.y < enemy.y + ENEMY_HEIGHT &&
    bullet.y + BULLET_HEIGHT > enemy.y
  );
}

export function isEnemyHitPlayer(
  enemy: EnemyType,
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
): boolean {
  return (
    enemy.x < playerX + playerWidth &&
    enemy.x + ENEMY_WIDTH > playerX &&
    enemy.y < playerY + playerHeight &&
    enemy.y + ENEMY_HEIGHT > playerY
  );
}