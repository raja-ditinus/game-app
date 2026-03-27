import { useCallback, useEffect, useRef, useState } from 'react';
import { storageService } from '../../../services/storageService';
import {
  BEST_SCORE_KEY,
  INITIAL_DIRECTION,
  INITIAL_SNAKE,
  INITIAL_SPEED,
  MIN_SPEED,
  SPEED_STEP,
} from '../constants';
import { Direction, Point } from '../types';
import {
  getNextHead,
  getRandomFoodPosition,
  isOppositeDirection,
  isSelfCollision,
  isWallCollision,
} from '../utils/snakeHelpers';

export function useSnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>(getRandomFoodPosition(INITIAL_SNAKE));
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);

  const scoreRef = useRef<number>(0);
  const bestScoreRef = useRef<number>(0);

  useEffect(() => {
    loadBestScore();
  }, []);

  const loadBestScore = async () => {
    const savedBest = await storageService.getNumber(BEST_SCORE_KEY);
    setBestScore(savedBest);
    bestScoreRef.current = savedBest;
  };

  const updateDirection = useCallback(
    (newDirection: Direction) => {
      if (isOppositeDirection(direction, newDirection)) return;
      setNextDirection(newDirection);
    },
    [direction],
  );
const closeGameOver = useCallback(() => {
  setIsGameOver(false);
  setIsPaused(true);
}, []);
  const togglePause = useCallback(() => {
    if (isGameOver) return;
    setIsPaused(prev => !prev);
  }, [isGameOver]);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(getRandomFoodPosition(INITIAL_SNAKE));
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setScore(0);
    scoreRef.current = 0;
    setIsPaused(false);
    setIsGameOver(false);
    setSpeed(INITIAL_SPEED);
  }, []);

  useEffect(() => {
    if (isPaused || isGameOver) return;

    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const appliedDirection = isOppositeDirection(direction, nextDirection)
          ? direction
          : nextDirection;

        const head = prevSnake[0];
        const nextHead = getNextHead(head, appliedDirection);
        setDirection(appliedDirection);

        const bodyWithoutTail = prevSnake.slice(0, -1);

        if (isWallCollision(nextHead) || isSelfCollision(nextHead, bodyWithoutTail)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const hasEaten = nextHead.x === food.x && nextHead.y === food.y;
        const nextSnake = [nextHead, ...prevSnake];

        if (hasEaten) {
          const nextScore = scoreRef.current + 1;
          scoreRef.current = nextScore;
          setScore(nextScore);
          setFood(getRandomFoodPosition(nextSnake));
          setSpeed(prev => Math.max(MIN_SPEED, prev - SPEED_STEP));

          if (nextScore > bestScoreRef.current) {
            bestScoreRef.current = nextScore;
            setBestScore(nextScore);
            storageService.setNumber(BEST_SCORE_KEY, nextScore);
          }

          return nextSnake;
        }

        nextSnake.pop();
        return nextSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, nextDirection, food, speed, isPaused, isGameOver]);

  return {
    snake,
    food,
    score,
    bestScore,
    isPaused,
    isGameOver,
    updateDirection,
    togglePause,
    resetGame,
    closeGameOver
  };
}