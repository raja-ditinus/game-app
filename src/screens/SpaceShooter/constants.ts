import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const GAME_HEIGHT = SCREEN_HEIGHT * 0.7;

export const PLAYER_WIDTH = 56;
export const PLAYER_HEIGHT = 72;

export const BULLET_WIDTH = 6;
export const BULLET_HEIGHT = 18;
export const BULLET_SPEED = 12;

export const ENEMY_WIDTH = 46;
export const ENEMY_HEIGHT = 46;
export const ENEMY_SPEED = 3.2;

export const GAME_TICK = 16;
export const ENEMY_SPAWN_MS = 900;
export const AUTO_SHOOT_MS = 260;

export const COLORS = {
  bgTop: '#020617',
  bgBottom: '#0F172A',
  text: '#FFFFFF',
  muted: '#94A3B8',
  accent: '#38BDF8',
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#F59E0B',
  card: 'rgba(255,255,255,0.08)',
  border: 'rgba(255,255,255,0.14)',
  overlay: 'rgba(0,0,0,0.52)',
  ship: '#38BDF8',
  bullet: '#FACC15',
  enemy: '#FB7185',
};