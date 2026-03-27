import { Dimensions } from 'react-native';
import { FruitKind } from './types';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const GRAVITY = 0.18;
export const SPAWN_INTERVAL = 900;
export const GAME_TICK = 16;
export const FRUIT_RADIUS = 32;
export const MAX_LIVES = 3;


export const FRUIT_EMOJI: Record<FruitKind, string> = {
  apple: '🍎',
  orange: '🍊',
  watermelon: '🍉',
  banana: '🍌',
  bomb: '💣',
};

export const NORMAL_FRUITS: FruitKind[] = [
  'apple',
  'orange',
  'watermelon',
  'banana',
];

export const THEME = {
  bgTop: '#020617',
  bgBottom: '#0F172A',
  card: 'rgba(255,255,255,0.08)',
  border: 'rgba(255,255,255,0.14)',
  text: '#FFFFFF',
  muted: '#94A3B8',
  accent: '#38BDF8',
  danger: '#EF4444',
  success: '#22C55E',
  trail: '#7DD3FC',
  overlay: 'rgba(0,0,0,0.5)',
};