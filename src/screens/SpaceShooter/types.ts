export interface BulletType {
  id: string;
  x: number;
  y: number;
  active: boolean;
}

export interface EnemyType {
  id: string;
  x: number;
  y: number;
  active: boolean;
  speed: number;
}

export interface PlayerType {
  x: number;
  y: number;
  width: number;
  height: number;
}