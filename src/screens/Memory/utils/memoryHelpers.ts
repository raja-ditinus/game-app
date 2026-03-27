import { LEVEL_CONFIG, MEMORY_VALUES } from '../constants';
import { GameLevel, MemoryCardType } from '../types';

function shuffleArray<T>(array: T[]): T[] {
  const copied = [...array];

  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }

  return copied;
}

export function createMemoryCards(level: GameLevel): MemoryCardType[] {
  const pairCount = LEVEL_CONFIG[level].pairs;
  const selectedValues = MEMORY_VALUES.slice(0, pairCount);

  const cards = selectedValues.flatMap((value, index) => [
    {
      id: `${value}-${index}-a`,
      value,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: `${value}-${index}-b`,
      value,
      isFlipped: false,
      isMatched: false,
    },
  ]);

  return shuffleArray(cards);
}

export function allCardsMatched(cards: MemoryCardType[]): boolean {
  return cards.every(card => card.isMatched);
}