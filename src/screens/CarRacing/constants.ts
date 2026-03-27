export const ROAD_WIDTH = 300;
export const ROAD_HEIGHT = 520;
export const LANE_COUNT = 3;
export const PLAYER_CAR_WIDTH = 52;
export const PLAYER_CAR_HEIGHT = 92;
export const ENEMY_CAR_WIDTH = 52;
export const ENEMY_CAR_HEIGHT = 92;

export const INITIAL_SPEED = 6;
export const MAX_SPEED = 16;
export const SPEED_STEP = 0.3;

export const CAR_COLORS = {
  bgTop: '#020617',
  bgBottom: '#0F172A',
  road: '#111827',
  roadEdge: '#38BDF8',
  lane: 'rgba(255,255,255,0.55)',
  player: '#22C55E',
  enemy1: '#EF4444',
  enemy2: '#F59E0B',
  enemy3: '#8B5CF6',
  hud: 'rgba(255,255,255,0.08)',
  hudBorder: 'rgba(255,255,255,0.14)',
  text: '#FFFFFF',
  muted: '#94A3B8',
  overlay: 'rgba(0,0,0,0.45)',
};

export const ENEMY_COLORS = [
  CAR_COLORS.enemy1,
  CAR_COLORS.enemy2,
  CAR_COLORS.enemy3,
];