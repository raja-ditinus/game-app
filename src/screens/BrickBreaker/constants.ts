export const GAME_WIDTH = 360;
export const GAME_HEIGHT = 620;

export const PADDLE_WIDTH = 96;
export const PADDLE_HEIGHT = 14;
export const PADDLE_Y = GAME_HEIGHT - 56;

export const BALL_SIZE = 14;
export const BALL_START_DX = 3.2;
export const BALL_START_DY = -4.2;

export const BRICK_ROWS = 5;
export const BRICK_COLUMNS = 6;
export const BRICK_GAP = 6;
export const BRICK_HEIGHT = 26;
export const BRICK_TOP_OFFSET = 70;
export const BRICK_SIDE_PADDING = 10;

export const BRICK_WIDTH =
  (GAME_WIDTH - BRICK_SIDE_PADDING * 2 - BRICK_GAP * (BRICK_COLUMNS - 1)) /
  BRICK_COLUMNS;

export const INITIAL_LIVES = 3;

export const COLORS = {
  bgTop: '#020617',
  bgBottom: '#0F172A',
  panel: 'rgba(255,255,255,0.08)',
  panelBorder: 'rgba(255,255,255,0.14)',
  white: '#FFFFFF',
  muted: '#94A3B8',
  paddle: '#22C55E',
  ball: '#FACC15',
  brick1: '#38BDF8',
  brick2: '#A78BFA',
  brick3: '#FB7185',
  brick4: '#F59E0B',
  brick5: '#34D399',
  overlay: 'rgba(0,0,0,0.5)',
};

export const BRICK_COLORS = [
  COLORS.brick1,
  COLORS.brick2,
  COLORS.brick3,
  COLORS.brick4,
  COLORS.brick5,
];