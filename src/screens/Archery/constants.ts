import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const GROUND_Y = SCREEN_HEIGHT * 0.48;
export const BOW_X = 48;
export const BOW_Y = GROUND_Y - 40;

export const TARGET_Y = SCREEN_HEIGHT * 0.28;
export const TARGET_RADIUS = 44;
export const TARGET_MIN_X = SCREEN_WIDTH * 0.52;
export const TARGET_MAX_X = SCREEN_WIDTH - 70;

export const GRAVITY = 0.33;
export const GAME_TICK = 16;
export const MAX_PULL_DISTANCE = 120;
export const POWER_MULTIPLIER = 0.17;
export const INITIAL_TIME = 45;
export const MAX_ARROWS = 6;

export const COLORS = {
  bgTop: '#020617',
  bgBottom: '#0F172A',
  text: '#FFFFFF',
  muted: '#94A3B8',
  card: 'rgba(255,255,255,0.08)',
  border: 'rgba(255,255,255,0.14)',
  accent: '#38BDF8',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  targetRed: '#EF4444',
  targetCream: '#FFF7ED',
  targetBlue: '#1D4ED8',
  bow: '#8B5E34',
  arrow: '#E2E8F0',
  arrowTip: '#FB7185',
  guide: 'rgba(125,211,252,0.55)',
  overlay: 'rgba(0,0,0,0.52)',
};