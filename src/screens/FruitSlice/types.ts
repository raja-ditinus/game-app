export type FruitKind =
  | 'apple'
  | 'orange'
  | 'watermelon'
  | 'banana'
  | 'bomb';

export interface FruitType {
  id: string;
  kind: FruitKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  sliced: boolean;
  radius: number;
}

export interface SlashPoint {
  x: number;
  y: number;
}