import { useCallback, useEffect, useRef, useState } from 'react';
import Sound from 'react-native-sound';
import {
  BIRD_SIZE,
  BIRD_X,
  FLAP,
  GAME_TICK,
  GRAVITY,
  PIPE_SPAWN_MS,
  PIPE_SPEED,
  PIPE_WIDTH,
} from '../constants';
import {
  createPipe,
  didBirdHitGround,
  didBirdHitPipe,
  didBirdHitTop,
  shouldIncreaseScore,
} from '../utils/flappyHelpers';
import { BirdType, PipeType } from '../types';


Sound.setCategory('Playback');

function loadSound(name: string) {
  return new Sound(name, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('Sound load error:', error);
    }
  });
}

export function useFlappyBirdGame() {
  const [bird, setBird] = useState<BirdType>({
    x: BIRD_X,
    y: 220,
    velocity: 0,
    size: BIRD_SIZE,
  });
  const [pipes, setPipes] = useState<PipeType[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [flashHit, setFlashHit] = useState(false);

  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pipeIdRef = useRef(0);

  const flapSoundRef = useRef<Sound | null>(null);
  const hitSoundRef = useRef<Sound | null>(null);
  const scoreSoundRef = useRef<Sound | null>(null);

  useEffect(() => {
    flapSoundRef.current = loadSound('flap.mp3');
    hitSoundRef.current = loadSound('hit.mp3');
    scoreSoundRef.current = loadSound('score.mp3');

    return () => {
      flapSoundRef.current?.release();
      hitSoundRef.current?.release();
      scoreSoundRef.current?.release();
    };
  }, []);

  const playFlap = useCallback(() => {
    flapSoundRef.current?.stop(() => {
      flapSoundRef.current?.play();
    });
  }, []);

  const playHit = useCallback(() => {
    hitSoundRef.current?.stop(() => {
      hitSoundRef.current?.play();
    });
  }, []);

  const playScore = useCallback(() => {
    scoreSoundRef.current?.stop(() => {
      scoreSoundRef.current?.play();
    });
  }, []);

  const clearAll = useCallback(() => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
  }, []);

  const triggerHit = useCallback(() => {
    setFlashHit(true);
    playHit();
    setTimeout(() => setFlashHit(false), 180);
  }, [playHit]);

  const resetGame = useCallback(() => {
    clearAll();
    setBird({ x: BIRD_X, y: 220, velocity: 0, size: BIRD_SIZE });
    setPipes([]);
    setScore(0);
    setIsStarted(false);
    setIsGameOver(false);
    setIsStarting(false);
    setFlashHit(false);
  }, [clearAll]);

const startGame = useCallback(() => {
  if (isStarted || isStarting) return;

  setIsStarting(true);
  setBird({ x: BIRD_X, y: 220, velocity: 0, size: BIRD_SIZE });
  setScore(0);
  setIsGameOver(false);
  setFlashHit(false);

  pipeIdRef.current = 1;
  setPipes([createPipe(`pipe-${pipeIdRef.current}`)]);

  requestAnimationFrame(() => {
    setIsStarted(true);
    setIsStarting(false);
  });
}, [isStarted, isStarting]);

  const flap = useCallback(() => {
    if (!isStarted || isGameOver) return;

    playFlap();

    setBird(prev => ({
      ...prev,
      velocity: FLAP,
    }));
  }, [isStarted, isGameOver, playFlap]);

  useEffect(() => {
    if (!isStarted || isGameOver) {
      clearAll();
      return;
    }

    spawnRef.current = setInterval(() => {
      pipeIdRef.current += 1;
      setPipes(prev => [...prev, createPipe(`pipe-${pipeIdRef.current}`)]);
    }, PIPE_SPAWN_MS);

    gameLoopRef.current = setInterval(() => {
      setBird(prevBird => {
        const nextVelocity = prevBird.velocity + GRAVITY;
        const nextY = prevBird.y + nextVelocity;

        if (didBirdHitGround(nextY) || didBirdHitTop(nextY)) {
          triggerHit();
          setIsGameOver(true);
          setIsStarted(false);
          return prevBird;
        }

        return {
          ...prevBird,
          y: nextY,
          velocity: nextVelocity,
        };
      });

      setPipes(prevPipes => {
        const movedPipes = prevPipes
          .map(pipe => ({
            ...pipe,
            x: pipe.x - PIPE_SPEED,
          }))
          .filter(pipe => pipe.x + PIPE_WIDTH > -20);

        let hasCollision = false;

        const updatedPipes = movedPipes.map(pipe => {
          if (
            didBirdHitPipe(
              bird.x,
              bird.y,
              bird.size,
              pipe.x,
              PIPE_WIDTH,
              pipe.gapY,
            )
          ) {
            hasCollision = true;
          }

          if (shouldIncreaseScore(pipe.x, pipe.passed, bird.x)) {
            playScore();

            setScore(prevScore => {
              const next = prevScore + 1;
              setBestScore(prevBest => Math.max(prevBest, next));
              return next;
            });

            return {
              ...pipe,
              passed: true,
            };
          }

          return pipe;
        });

        if (hasCollision) {
          triggerHit();
          setIsGameOver(true);
          setIsStarted(false);
        }

        return updatedPipes;
      });
    }, GAME_TICK);

    return clearAll;
  }, [
    isStarted,
  isGameOver,
  clearAll,
  triggerHit,
  playScore,
  ]);

  const rotation = Math.max(-25, Math.min(75, bird.velocity * 6));

  return {
    bird,
    pipes,
    score,
    bestScore,
    rotation,
    isStarted,
    isGameOver,
    isStarting,
    flashHit,
    startGame,
    resetGame,
    flap,
  };
}