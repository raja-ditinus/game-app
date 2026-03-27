import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BALL_START_DX,
  BALL_START_DY,
  GAME_WIDTH,
  INITIAL_LIVES,
} from '../constants';
import { BallType, BrickType, PaddleType } from '../types';
import {
  checkBrickCollision,
  checkPaddleCollision,
  clampPaddleX,
  createInitialBall,
  createInitialBricks,
  createInitialPaddle,
  isBallOut,
} from '../utils/brickHelpers';

export function useBrickBreakerGame() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [level, setLevel] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [ball, setBall] = useState<BallType>(createInitialBall());
  const [paddle, setPaddle] = useState<PaddleType>(createInitialPaddle());
  const [bricks, setBricks] = useState<BrickType[]>(createInitialBricks(1));

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startGame = useCallback(() => {
    setIsStarted(true);
    setIsGameOver(false);
  }, []);

  const resetBallAndPaddle = useCallback(() => {
    setBall(createInitialBall());
    setPaddle(createInitialPaddle());
  }, []);

  const resetGame = useCallback(() => {
    setScore(0);
    setLives(INITIAL_LIVES);
    setLevel(1);
    setIsStarted(false);
    setIsGameOver(false);
    setBall(createInitialBall());
    setPaddle(createInitialPaddle());
    setBricks(createInitialBricks(1));
  }, []);

  const movePaddle = useCallback((touchX: number) => {
    const nextX = clampPaddleX(touchX - paddle.width / 2);
    setPaddle(prev => ({ ...prev, x: nextX }));
  }, [paddle.width]);

  useEffect(() => {
    if (!isStarted || isGameOver) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setBall(prevBall => {
        let nextBall = {
          ...prevBall,
          x: prevBall.x + prevBall.dx,
          y: prevBall.y + prevBall.dy,
        };

        if (nextBall.x <= 0 || nextBall.x + nextBall.size >= GAME_WIDTH) {
          nextBall.dx = -nextBall.dx;
        }

        if (nextBall.y <= 0) {
          nextBall.dy = -nextBall.dy;
        }

        if (checkPaddleCollision(nextBall, paddle)) {
          const hitPoint =
            (nextBall.x + nextBall.size / 2 - paddle.x) / paddle.width - 0.5;

          nextBall.dy = -Math.abs(nextBall.dy);
          nextBall.dx = hitPoint * 8;
          nextBall.y = paddle.y - nextBall.size - 1;
        }

        let brickHit = false;

        setBricks(prevBricks =>
          prevBricks.map(brick => {
            if (!checkBrickCollision(nextBall, brick) || brickHit) {
              return brick;
            }

            brickHit = true;
            nextBall.dy = -nextBall.dy;

            const nextHits = brick.hitsLeft - 1;
            const isVisible = nextHits > 0;

            setScore(prevScore => {
              const updated = prevScore + 10;
              if (updated > bestScore) {
                setBestScore(updated);
              }
              return updated;
            });

            return {
              ...brick,
              hitsLeft: nextHits,
              visible: isVisible,
            };
          }),
        );

        if (isBallOut(nextBall)) {
          setLives(prevLives => {
            const nextLives = prevLives - 1;

            if (nextLives <= 0) {
              setIsGameOver(true);
              setIsStarted(false);
            } else {
              resetBallAndPaddle();
            }

            return nextLives;
          });

          return prevBall;
        }

        return nextBall;
      });
    }, 16);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStarted, isGameOver, paddle, bestScore, resetBallAndPaddle]);

  useEffect(() => {
    const visibleBricks = bricks.filter(brick => brick.visible);

    if (visibleBricks.length === 0 && isStarted && !isGameOver) {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      setBricks(createInitialBricks(nextLevel));
      setBall({
        ...createInitialBall(),
        dx: BALL_START_DX + nextLevel * 0.2,
        dy: BALL_START_DY - nextLevel * 0.2,
      });
      setPaddle(createInitialPaddle());
    }
  }, [bricks, isStarted, isGameOver, level]);

  return {
    score,
    bestScore,
    lives,
    level,
    isStarted,
    isGameOver,
    ball,
    paddle,
    bricks,
    startGame,
    movePaddle,
    resetGame,
  };
}