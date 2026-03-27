import { PlayerColor, PlayerState } from './types';

export const GRID_SIZE = 15;
export const INITIAL_DICE = 1;

export const PLAYER_COLORS: PlayerColor[] = ['red', 'green', 'yellow', 'blue'];

export const COLORS = {
  red: '#EF4444',
  green: '#22C55E',
  yellow: '#FACC15',
  blue: '#38BDF8',
  white: '#F8FAFC',
  border: '#111827',
  bg: '#0B1220',
  panel: 'rgba(255,255,255,0.08)',
  panelBorder: 'rgba(255,255,255,0.14)',
  text: '#FFFFFF',
  muted: '#CBD5E1',
  darkText: '#0F172A',
};

export const SAFE_STEPS = [0, 8, 13, 21, 26, 34, 39, 47];

export const START_STEP: Record<PlayerColor, number> = {
  red: 0,
  green: 13,
  yellow: 26,
  blue: 39,
};

export const HOME_ENTRY_STEP: Record<PlayerColor, number> = {
  red: 50,
  green: 11,
  yellow: 24,
  blue: 37,
};

export const PLAYER_THEME: Record<PlayerColor, string> = {
  red: COLORS.red,
  green: COLORS.green,
  yellow: COLORS.yellow,
  blue: COLORS.blue,
};

export const createInitialPlayers = (): Record<PlayerColor, PlayerState> => ({
  red: {
    color: 'red',
    finishedCount: 0,
    tokens: [
      { id: 'red-1', player: 'red', step: -1, isFinished: false },
      { id: 'red-2', player: 'red', step: -1, isFinished: false },
      { id: 'red-3', player: 'red', step: -1, isFinished: false },
      { id: 'red-4', player: 'red', step: -1, isFinished: false },
    ],
  },
  green: {
    color: 'green',
    finishedCount: 0,
    tokens: [
      { id: 'green-1', player: 'green', step: -1, isFinished: false },
      { id: 'green-2', player: 'green', step: -1, isFinished: false },
      { id: 'green-3', player: 'green', step: -1, isFinished: false },
      { id: 'green-4', player: 'green', step: -1, isFinished: false },
    ],
  },
  yellow: {
    color: 'yellow',
    finishedCount: 0,
    tokens: [
      { id: 'yellow-1', player: 'yellow', step: -1, isFinished: false },
      { id: 'yellow-2', player: 'yellow', step: -1, isFinished: false },
      { id: 'yellow-3', player: 'yellow', step: -1, isFinished: false },
      { id: 'yellow-4', player: 'yellow', step: -1, isFinished: false },
    ],
  },
  blue: {
    color: 'blue',
    finishedCount: 0,
    tokens: [
      { id: 'blue-1', player: 'blue', step: -1, isFinished: false },
      { id: 'blue-2', player: 'blue', step: -1, isFinished: false },
      { id: 'blue-3', player: 'blue', step: -1, isFinished: false },
      { id: 'blue-4', player: 'blue', step: -1, isFinished: false },
    ],
  },
});