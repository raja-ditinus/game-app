import { useCallback, useEffect, useRef, useState } from 'react';
import Sound from 'react-native-sound';
import {
    GAME_TICK,
    GRAVITY,
    MAX_LIVES,
    SCREEN_HEIGHT,
    SPAWN_INTERVAL,
} from '../constants';
import { createFruit, didSlashHitFruit } from '../utils/fruitHelpers';
import { FruitType, SlashPoint } from '../types';

Sound.setCategory('Playback');

function loadSound(file: string) {
    return new Sound(file, Sound.MAIN_BUNDLE, error => {
        if (error) {
            // ignore sound load error in starter
        }
    });
}

export function useFruitSliceGame() {

    const [fruits, setFruits] = useState<FruitType[]>([]);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [lives, setLives] = useState(MAX_LIVES);
    const [isStarted, setIsStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [slashTrail, setSlashTrail] = useState<SlashPoint[]>([]);
    const [isStarting, setIsStarting] = useState(false);
    const gameIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const spawnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const slashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fruitIdRef = useRef(0);
    const sliceSoundRef = useRef<Sound | null>(null);
    const bombSoundRef = useRef<Sound | null>(null);
    const gameOverSoundRef = useRef<Sound | null>(null);

    useEffect(() => {
        sliceSoundRef.current = loadSound('slice.mp3');
        bombSoundRef.current = loadSound('bomb.mp3');
        gameOverSoundRef.current = loadSound('gameover.mp3');

        return () => {
            sliceSoundRef.current?.release();
            bombSoundRef.current?.release();
            gameOverSoundRef.current?.release();
        };
    }, []);

    const playSlice = useCallback(() => {
        sliceSoundRef.current?.stop(() => {
            sliceSoundRef.current?.play();
        });
    }, []);

    const playBomb = useCallback(() => {
        bombSoundRef.current?.stop(() => {
            bombSoundRef.current?.play();
        });
    }, []);

    const playGameOver = useCallback(() => {
        gameOverSoundRef.current?.stop(() => {
            gameOverSoundRef.current?.play();
        });
    }, []);

    const clearTimers = useCallback(() => {
        if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
        if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    }, []);

    const resetGame = useCallback(() => {
        clearTimers();
        setFruits([]);
        setScore(0);
        setCombo(0);
        setLives(MAX_LIVES);
        setIsStarted(false);
        setIsGameOver(false);
        setSlashTrail([]);
    }, [clearTimers]);

    const endGame = useCallback(() => {
        clearTimers();
        setIsGameOver(true);
        setIsStarted(false);
        playGameOver();
    }, [clearTimers, playGameOver]);

    const startGame = useCallback(() => {
        if (isStarted || isStarting) return;

        setIsStarting(true);
        clearTimers();

        setFruits([]);
        setScore(0);
        setCombo(0);
        setLives(MAX_LIVES);
        setSlashTrail([]);
        setIsGameOver(false);

        requestAnimationFrame(() => {
            setIsStarted(true);
            setIsStarting(false);
        });
    }, [isStarted, isStarting, clearTimers]);

    useEffect(() => {
        if (!isStarted || isGameOver) {
            clearTimers();
            return;
        }

        spawnIntervalRef.current = setInterval(() => {
            fruitIdRef.current += 1;
            setFruits(prev => [...prev, createFruit(`fruit-${fruitIdRef.current}`)]);
        }, SPAWN_INTERVAL);

        gameIntervalRef.current = setInterval(() => {
            setFruits(prevFruits => {
                const updated = prevFruits
                    .map(fruit => ({
                        ...fruit,
                        x: fruit.x + fruit.vx,
                        y: fruit.y + fruit.vy,
                        vy: fruit.vy + GRAVITY,
                        rotation: fruit.rotation + 4,
                    }))
                    .filter(fruit => fruit.y < SCREEN_HEIGHT + 60);

                const missed = updated.filter(
                    fruit =>
                        !fruit.sliced &&
                        fruit.kind !== 'bomb' &&
                        fruit.y > SCREEN_HEIGHT + 10,
                );

                if (missed.length > 0) {
                    setLives(prevLives => {
                        const nextLives = Math.max(0, prevLives - missed.length);
                        if (nextLives <= 0) {
                            setTimeout(() => endGame(), 50);
                        }
                        return nextLives;
                    });
                    setCombo(0);
                }

                return updated.filter(
                    fruit =>
                        !(fruit.y > SCREEN_HEIGHT + 10 && fruit.kind !== 'bomb' && !fruit.sliced),
                );
            });
        }, GAME_TICK);

        return clearTimers;
    }, [isStarted, isGameOver, clearTimers, endGame]);

    //   const onSlash = useCallback(
    //     (path: SlashPoint[]) => {
    //       if (!isStarted || isGameOver || path.length === 0) return;

    //       setSlashTrail(path);

    //       setTimeout(() => {
    //         setSlashTrail([]);
    //       }, 80);

    //       let slicedCount = 0;
    //       let bombHit = false;

    //       setFruits(prev =>
    //         prev.filter(fruit => {
    //           if (fruit.sliced) return true;

    //           const hit = didSlashHitFruit(path, fruit);

    //           if (!hit) return true;

    //           if (fruit.kind === 'bomb') {
    //             bombHit = true;
    //             return false;
    //           }

    //           slicedCount += 1;
    //           return false;
    //         }),
    //       );

    //       if (bombHit) {
    //         playBomb();
    //         endGame();
    //         return;
    //       }

    //       if (slicedCount > 0) {
    //         playSlice();

    //         setCombo(prevCombo => {
    //           const nextCombo = slicedCount > 1 ? prevCombo + slicedCount : 0;
    //           return nextCombo;
    //         });

    //         setScore(prevScore => prevScore + slicedCount * 10);
    //       }
    //     },
    //     [isStarted, isGameOver, playSlice, playBomb, endGame],
    //   );
    const onSlash = useCallback(
        (path: SlashPoint[]) => {
            if (!isStarted || isGameOver || path.length < 2) return;

            setSlashTrail(path);

            if (slashTimeoutRef.current) {
                clearTimeout(slashTimeoutRef.current);
            }

            slashTimeoutRef.current = setTimeout(() => {
                setSlashTrail([]);
            }, 120);

            let slicedCount = 0;
            let bombHit = false;

            setFruits(prev =>
                prev.filter(fruit => {
                    const hit = didSlashHitFruit(path, fruit);

                    if (!hit) return true;

                    if (fruit.kind === 'bomb') {
                        bombHit = true;
                        return false;
                    }

                    slicedCount += 1;
                    return false;
                }),
            );

            if (bombHit) {
                playBomb();
                endGame();
                return;
            }

            if (slicedCount > 0) {
                playSlice();

                setCombo(prevCombo =>
                    slicedCount > 1 ? prevCombo + slicedCount : 0,
                );

                setScore(prevScore => prevScore + slicedCount * 10);
            }
        },
        [isStarted, isGameOver, playSlice, playBomb, endGame],
    );
    return {
        fruits,
        score,
        combo,
        lives,
        isStarted,
        isGameOver,
        slashTrail,
        startGame,
        resetGame,
        onSlash,
        isStarting,
    };
}