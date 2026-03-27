import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AUTO_SHOOT_MS,
  ENEMY_SPAWN_MS,
  ENEMY_SPEED,
  GAME_HEIGHT,
  GAME_TICK,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  SCREEN_WIDTH,
} from '../constants';
import { BulletType, EnemyType, PlayerType } from '../types';
import {
  clamp,
  createBullet,
  createEnemy,
  isBulletHitEnemy,
  isEnemyHitPlayer,
} from '../utils/shooterHelpers';

export function useSpaceShooterGame() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const [player, setPlayer] = useState<PlayerType>({
    x: SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2,
    y: GAME_HEIGHT - PLAYER_HEIGHT - 24,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
  });

  const [bullets, setBullets] = useState<BulletType[]>([]);
  const [enemies, setEnemies] = useState<EnemyType[]>([]);

  const bulletIdRef = useRef(0);
  const enemyIdRef = useRef(0);
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shootRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAll = useCallback(() => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
    if (shootRef.current) clearInterval(shootRef.current);
  }, []);

  const resetPlayer = useCallback(() => {
    setPlayer({
      x: SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2,
      y: GAME_HEIGHT - PLAYER_HEIGHT - 24,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    });
  }, []);

  const resetGame = useCallback(() => {
    clearAll();
    setScore(0);
    setLives(3);
    setIsStarted(false);
    setIsGameOver(false);
    setIsStarting(false);
    setBullets([]);
    setEnemies([]);
    resetPlayer();
  }, [clearAll, resetPlayer]);

  const startGame = useCallback(() => {
    if (isStarted || isStarting) return;

    setIsStarting(true);
    setScore(0);
    setLives(3);
    setBullets([]);
    setEnemies([]);
    setIsGameOver(false);
    resetPlayer();

    requestAnimationFrame(() => {
      setIsStarted(true);
      setIsStarting(false);
    });
  }, [isStarted, isStarting, resetPlayer]);

  const movePlayer = useCallback((touchX: number) => {
    const nextX = clamp(
      touchX - PLAYER_WIDTH / 2,
      0,
      SCREEN_WIDTH - PLAYER_WIDTH,
    );

    setPlayer(prev => ({
      ...prev,
      x: nextX,
    }));
  }, []);

  useEffect(() => {
    if (!isStarted || isGameOver) {
      clearAll();
      return;
    }

    spawnRef.current = setInterval(() => {
      enemyIdRef.current += 1;
      setEnemies(prev => [...prev, createEnemy(`enemy-${enemyIdRef.current}`)]);
    }, ENEMY_SPAWN_MS);

    shootRef.current = setInterval(() => {
      bulletIdRef.current += 1;
      setBullets(prev => [
        ...prev,
        createBullet(`bullet-${bulletIdRef.current}`, player.x, player.y),
      ]);
    }, AUTO_SHOOT_MS);

    gameLoopRef.current = setInterval(() => {
      setBullets(prevBullets => {
        let movedBullets = prevBullets
          .map(bullet => ({
            ...bullet,
            y: bullet.y - 12,
          }))
          .filter(bullet => bullet.y > -30);

        setEnemies(prevEnemies => {
          let movedEnemies = prevEnemies
            .map(enemy => ({
              ...enemy,
              y: enemy.y + enemy.speed + ENEMY_SPEED * 0.1,
            }))
            .filter(enemy => enemy.y < GAME_HEIGHT + 80);

          const remainingEnemies: EnemyType[] = [];
          const remainingBullets: BulletType[] = [];

          for (const bullet of movedBullets) {
            let hit = false;

            for (let i = 0; i < movedEnemies.length; i += 1) {
              const enemy = movedEnemies[i];

              if (isBulletHitEnemy(bullet, enemy)) {
                hit = true;
                movedEnemies.splice(i, 1);

                setScore(prevScore => {
                  const next = prevScore + 10;
                  setBestScore(prevBest => Math.max(prevBest, next));
                  return next;
                });

                break;
              }
            }

            if (!hit) {
              remainingBullets.push(bullet);
            }
          }

          movedBullets = remainingBullets;

          const collidedEnemies = movedEnemies.filter(enemy =>
            isEnemyHitPlayer(
              enemy,
              player.x,
              player.y,
              player.width,
              player.height,
            ),
          );

          if (collidedEnemies.length > 0) {
            setLives(prevLives => {
              const nextLives = prevLives - collidedEnemies.length;

              if (nextLives <= 0) {
                setIsGameOver(true);
                setIsStarted(false);
                return 0;
              }

              return nextLives;
            });

            movedEnemies = movedEnemies.filter(
              enemy =>
                !isEnemyHitPlayer(
                  enemy,
                  player.x,
                  player.y,
                  player.width,
                  player.height,
                ),
            );
          }

          return movedEnemies;
        });

        return movedBullets;
      });
    }, GAME_TICK);

    return clearAll;
  }, [isStarted, isGameOver, player.x, player.y, player.width, player.height, clearAll]);

  return {
    score,
    bestScore,
    lives,
    isStarted,
    isGameOver,
    isStarting,
    player,
    bullets,
    enemies,
    startGame,
    resetGame,
    movePlayer,
  };
}