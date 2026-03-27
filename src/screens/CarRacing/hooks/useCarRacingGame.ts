import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ENEMY_COLORS,
  ENEMY_CAR_HEIGHT,
  INITIAL_SPEED,
  MAX_SPEED,
  ROAD_HEIGHT,
  SPEED_STEP,
} from '../constants';
import { EnemyCarType, Lane } from '../types';

function randomLane(): Lane {
  return Math.floor(Math.random() * 3) as Lane;
}

function randomColor() {
  return ENEMY_COLORS[Math.floor(Math.random() * ENEMY_COLORS.length)];
}

function createEnemy(id: string, top: number): EnemyCarType {
  return {
    id,
    lane: randomLane(),
    top,
    color: randomColor(),
  };
}

export function useCarRacingGame() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerLane, setPlayerLane] = useState<Lane>(1);
  const [isBoosting, setIsBoosting] = useState(false);
  const [enemies, setEnemies] = useState<EnemyCarType[]>([
    createEnemy('enemy-1', -120),
    createEnemy('enemy-2', -320),
    createEnemy('enemy-3', -520),
  ]);

  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const moveLeft = useCallback(() => {
    setPlayerLane(prev => (prev > 0 ? ((prev - 1) as Lane) : prev));
  }, []);

  const moveRight = useCallback(() => {
    setPlayerLane(prev => (prev < 2 ? ((prev + 1) as Lane) : prev));
  }, []);

const boost = useCallback(() => {
  if (isBoosting || isGameOver || !isStarted) return;

  setIsBoosting(true);

  setSpeed(prev => Math.min(prev + 6, MAX_SPEED + 6));

  setTimeout(() => {
    setSpeed(prev => Math.max(prev - 6, INITIAL_SPEED));
    setIsBoosting(false);
  }, 2000); 
  // boost for 2 sec
}, [isBoosting, isGameOver, isStarted]);
  const startGame = useCallback(() => {
    setIsStarted(true);
    setIsPaused(false);
    setIsGameOver(false);
  }, []);

  const togglePause = useCallback(() => {
    if (!isStarted || isGameOver) return;
    setIsPaused(prev => !prev);
  }, [isStarted, isGameOver]);

  const resetGame = useCallback(() => {
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setPlayerLane(1);
    setEnemies([
      createEnemy('enemy-1', -120),
      createEnemy('enemy-2', -320),
      createEnemy('enemy-3', -520),
    ]);
    setIsStarted(false);
    setIsPaused(false);
    setIsGameOver(false);
  }, []);

  useEffect(() => {
    if (!isStarted || isPaused || isGameOver) {
      if (frameRef.current) {
        clearInterval(frameRef.current);
      }
      return;
    }


    frameRef.current = setInterval(() => {
      setEnemies(prevEnemies => {
        const updated = prevEnemies.map(enemy => {
          let nextTop = enemy.top + speed;

          if (nextTop > ROAD_HEIGHT) {
            setScore(prev => {
              const nextScore = prev + 1;

              if (nextScore > bestScore) {
                setBestScore(nextScore);
              }

              if (nextScore > 0 && nextScore % 8 === 0) {
                setSpeed(prevSpeed => Math.min(MAX_SPEED, prevSpeed + SPEED_STEP));
              }

              return nextScore;
            });

            return createEnemy(enemy.id, -120 - Math.random() * 260);
          }

          return { ...enemy, top: nextTop };
        });

        return updated;
      });
    }, 30);

    return () => {
      if (frameRef.current) {
        clearInterval(frameRef.current);
      }
    };
  }, [isStarted, isPaused, isGameOver, speed, bestScore]);

  useEffect(() => {
    if (!isStarted || isPaused || isGameOver) return;

    const playerTop = ROAD_HEIGHT - 120;

    const collision = enemies.some(enemy => {
      const sameLane = enemy.lane === playerLane;
      const overlap =
        enemy.top + ENEMY_CAR_HEIGHT > playerTop &&
        enemy.top < playerTop + ENEMY_CAR_HEIGHT;

      return sameLane && overlap;
    });

    if (collision) {
      setIsGameOver(true);
      setIsPaused(false);
    }
  }, [enemies, playerLane, isStarted, isPaused, isGameOver]);

  const currentState = useMemo(
    () => ({
      score,
      bestScore,
      speed,
      isStarted,
      isPaused,
      isGameOver,
      playerLane,
      enemies,
      isBoosting,

    }),
    [score, bestScore, speed, isStarted, isPaused, isGameOver, playerLane, enemies, isBoosting,],
  );

  return {
    ...currentState,
    moveLeft,
    moveRight,
    startGame,
    togglePause,
    resetGame,
    boost,          // ✅ add this
  isBoosting,     // optional UI use
  };
}