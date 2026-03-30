import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const GAME_HEIGHT = SCREEN_HEIGHT * 0.68;
export const GROUND_HEIGHT = 80;

export const BIRD_SIZE = 30;
export const BIRD_X = 120;

export const GRAVITY = 0.5;
export const FLAP = -7;

export const PIPE_WIDTH = 60;
export const PIPE_GAP = 150;
export const PIPE_SPEED = 3;

export const GAME_TICK = 16;
export const PIPE_SPAWN_MS = 1200;

export const GAME_BOTTOM = GAME_HEIGHT - GROUND_HEIGHT;