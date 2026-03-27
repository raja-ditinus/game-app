import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BOW_X,
  BOW_Y,
  GAME_TICK,
  GRAVITY,
  INITIAL_TIME,
  MAX_ARROWS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  TARGET_MAX_X,
  TARGET_MIN_X,
  TARGET_RADIUS,
  TARGET_Y,
} from '../constants';
import { getArrowAngle, getArrowVelocity, getShotResult } from '../utils/physics';
import { ArrowState, Point, TargetState } from '../types';

export function useArcheryGame() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [arrowsLeft, setArrowsLeft] = useState(MAX_ARROWS);
  const [combo, setCombo] = useState(0);
  const [perfectHits, setPerfectHits] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [pullStart, setPullStart] = useState<Point>({ x: BOW_X, y: BOW_Y });
  const [pullCurrent, setPullCurrent] = useState<Point>({ x: BOW_X, y: BOW_Y });
  const [activeArrow, setActiveArrow] = useState<ArrowState | null>(null);
  const [flashHit, setFlashHit] = useState(false);
  const [shotText, setShotText] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const [target, setTarget] = useState<TargetState>({
    x: SCREEN_WIDTH * 0.74,
    y: TARGET_Y,
    radius: TARGET_RADIUS,
    direction: 1,
    speed: 2.2,
  });

  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const arrowIdRef = useRef(0);

  const clearAllTimers = useCallback(() => {
    if (loopRef.current) clearInterval(loopRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const resetGame = useCallback(() => {
    clearAllTimers();
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setArrowsLeft(MAX_ARROWS);
    setCombo(0);
    setPerfectHits(0);
    setIsStarted(false);
    setIsGameOver(false);
    setIsPulling(false);
    setPullStart({ x: BOW_X, y: BOW_Y });
    setPullCurrent({ x: BOW_X, y: BOW_Y });
    setActiveArrow(null);
    setFlashHit(false);
    setShotText('');
    setTarget({
      x: SCREEN_WIDTH * 0.74,
      y: TARGET_Y,
      radius: TARGET_RADIUS,
      direction: 1,
      speed: 2.2,
    });
  }, [clearAllTimers]);

  const endGame = useCallback(() => {
    clearAllTimers();
    setIsGameOver(true);
    setIsStarted(false);
    setBestScore(prev => Math.max(prev, score));
  }, [clearAllTimers, score]);

const startGame = useCallback(() => {
  if (isStarted || isStarting) return;

  setIsStarting(true);

  clearAllTimers();
  setScore(0);
  setTimeLeft(INITIAL_TIME);
  setArrowsLeft(MAX_ARROWS);
  setCombo(0);
  setPerfectHits(0);
  setActiveArrow(null);
  setFlashHit(false);
  setShotText('');
  setIsGameOver(false);

  requestAnimationFrame(() => {
    setIsStarted(true);
    setIsStarting(false);
  });
}, [isStarted, isStarting, clearAllTimers]);

  const beginPull = useCallback((point: Point) => {
    if (!isStarted || isGameOver || activeArrow || arrowsLeft <= 0) return;
    setIsPulling(true);
    setPullStart({ x: BOW_X, y: BOW_Y });
    setPullCurrent(point);
  }, [isStarted, isGameOver, activeArrow, arrowsLeft]);

  const updatePull = useCallback((point: Point) => {
    if (!isPulling) return;
    setPullCurrent(point);
  }, [isPulling]);

  const releaseArrow = useCallback(() => {
    if (!isPulling || !isStarted || isGameOver || arrowsLeft <= 0) {
      setIsPulling(false);
      return;
    }

    const velocity = getArrowVelocity(pullStart, pullCurrent);

    arrowIdRef.current += 1;
    setActiveArrow({
      id: `arrow-${arrowIdRef.current}`,
      position: { x: BOW_X + 14, y: BOW_Y + 10 },
      velocity,
      angle: getArrowAngle(velocity),
      active: true,
      hit: false,
    });

    setArrowsLeft(prev => Math.max(0, prev - 1));
    setIsPulling(false);
    setPullCurrent({ x: BOW_X, y: BOW_Y });
  }, [isPulling, isStarted, isGameOver, arrowsLeft, pullStart, pullCurrent]);

  useEffect(() => {
    if (!isStarted || isGameOver) {
      clearAllTimers();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTimeout(() => endGame(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    loopRef.current = setInterval(() => {
      setTarget(prev => {
        let nextX = prev.x + prev.speed * prev.direction;
        let nextDirection = prev.direction;

        if (nextX >= TARGET_MAX_X) {
          nextX = TARGET_MAX_X;
          nextDirection = -1;
        } else if (nextX <= TARGET_MIN_X) {
          nextX = TARGET_MIN_X;
          nextDirection = 1;
        }

        return {
          ...prev,
          x: nextX,
          direction: nextDirection,
        };
      });

      setActiveArrow(prev => {
        if (!prev) return null;

        const nextVelocity = {
          x: prev.velocity.x,
          y: prev.velocity.y + GRAVITY,
        };

        const nextPosition = {
          x: prev.position.x + nextVelocity.x,
          y: prev.position.y + nextVelocity.y,
        };

        const nextAngle = getArrowAngle(nextVelocity);

        const result = getShotResult(nextPosition.x + 18, nextPosition.y + 3, target.x, target.y);

        if (result.hit) {
          setScore(prevScore => prevScore + result.points + combo * 5);
          setCombo(prevCombo => prevCombo + 1);
          setFlashHit(true);
          setShotText(result.perfect ? 'PERFECT +100' : `+${result.points}`);

          if (result.perfect) {
            setPerfectHits(prevPerfect => prevPerfect + 1);
          }

          setTimeout(() => setFlashHit(false), 120);
          setTimeout(() => setShotText(''), 700);

          return null;
        }

        if (
          nextPosition.x > SCREEN_WIDTH ||
          nextPosition.y > SCREEN_HEIGHT ||
          nextPosition.x < -60
        ) {
          setCombo(0);
          setShotText('MISS');
          setTimeout(() => setShotText(''), 500);

          if (arrowsLeft - 1 <= 0) {
            setTimeout(() => endGame(), 0);
          }

          return null;
        }

        return {
          ...prev,
          position: nextPosition,
          velocity: nextVelocity,
          angle: nextAngle,
        };
      });
    }, GAME_TICK);

    return clearAllTimers;
  }, [isStarted, isGameOver, clearAllTimers, endGame, target.x, target.y, combo, arrowsLeft]);

  useEffect(() => {
    if (arrowsLeft <= 0 && !activeArrow && isStarted) {
      endGame();
    }
  }, [arrowsLeft, activeArrow, isStarted, endGame]);

  return {
    score,
    bestScore,
    timeLeft,
    arrowsLeft,
    combo,
    perfectHits,
    isStarted,
    isGameOver,
    isPulling,
    pullStart,
    pullCurrent,
    activeArrow,
    target,
    flashHit,
    shotText,
    startGame,
    resetGame,
    beginPull,
    updatePull,
    releaseArrow,
    isStarting,
  };
}