import { GameLevel } from './types';

export const MEMORY_THEME = {
  bgTop: '#020617',
  bgBottom: '#0F172A',
  cardBack: '#1E293B',
  cardFront: '#FFFFFF',
  cardBorder: 'rgba(255,255,255,0.12)',
  cardMatched: '#22C55E',
  text: '#FFFFFF',
  muted: '#94A3B8',
  accent: '#38BDF8',
  warning: '#F59E0B',
  overlay: 'rgba(0,0,0,0.52)',
};

export const LEVEL_CONFIG: Record<
  GameLevel,
  { pairs: number; columns: number; label: string }
> = {
  easy: {
    pairs: 6,
    columns: 3,
    label: 'Easy',
  },
  medium: {
    pairs: 8,
    columns: 4,
    label: 'Medium',
  },
  hard: {
    pairs: 10,
    columns: 4,
    label: 'Hard',
  },
};

export const MEMORY_VALUES = [
  '🍎',
  '🚗',
  '🎮',
  '⚽',
  '🎵',
  '🐶',
  '🍕',
  '🌈',
  '🚀',
  '🧠',
  '🌙',
  '🔥',
];