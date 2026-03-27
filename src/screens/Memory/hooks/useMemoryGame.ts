import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LEVEL_CONFIG } from '../constants';
import { allCardsMatched, createMemoryCards } from '../utils/memoryHelpers';
import { GameLevel, MemoryCardType } from '../types';

export function useMemoryGame() {
  const [level, setLevel] = useState<GameLevel>('easy');
  const [cards, setCards] = useState<MemoryCardType[]>(createMemoryCards('easy'));
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [locked, setLocked] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const flippedOpenCards = useMemo(
    () => cards.filter(card => card.isFlipped && !card.isMatched),
    [cards],
  );

  useEffect(() => {
    if (!isStarted || isGameOver) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted, isGameOver]);

  useEffect(() => {
    if (flippedOpenCards.length !== 2) return;

    setLocked(true);
    setMoves(prev => prev + 1);

    const [first, second] = flippedOpenCards;

    if (first.value === second.value) {
      setCards(prev =>
        prev.map(card =>
          card.value === first.value && card.isFlipped
            ? { ...card, isMatched: true }
            : card,
        ),
      );

      setScore(prev => prev + 20);
      setLocked(false);
      return;
    }

    const timer = setTimeout(() => {
      setCards(prev =>
        prev.map(card =>
          card.id === first.id || card.id === second.id
            ? { ...card, isFlipped: false }
            : card,
        ),
      );
      setLocked(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [flippedOpenCards]);

  useEffect(() => {
    if (cards.length > 0 && allCardsMatched(cards)) {
      setIsGameOver(true);
      setIsStarted(false);
      setScore(prev => prev + 50);
    }
  }, [cards]);

  const startGame = useCallback(() => {
    setIsStarted(true);
    setIsGameOver(false);
  }, []);

  const restartGame = useCallback(
    (nextLevel?: GameLevel) => {
      const targetLevel = nextLevel ?? level;

      setLevel(targetLevel);
      setCards(createMemoryCards(targetLevel));
      setMoves(0);
      setTime(0);
      setScore(0);
      setIsStarted(false);
      setIsGameOver(false);
      setLocked(false);
    },
    [level],
  );

  const handleCardPress = useCallback(
    (cardId: string) => {
      if (!isStarted || locked) return;

      setCards(prev => {
        const clickedCard = prev.find(card => card.id === cardId);

        if (!clickedCard || clickedCard.isMatched || clickedCard.isFlipped) {
          return prev;
        }

        const openCards = prev.filter(card => card.isFlipped && !card.isMatched);
        if (openCards.length >= 2) return prev;

        return prev.map(card =>
          card.id === cardId ? { ...card, isFlipped: true } : card,
        );
      });
    },
    [isStarted, locked],
  );

  return {
    level,
    cards,
    moves,
    time,
    score,
    isStarted,
    isGameOver,
    columns: LEVEL_CONFIG[level].columns,
    levelLabel: LEVEL_CONFIG[level].label,
    startGame,
    restartGame,
    handleCardPress,
    setLevel,
  };
}