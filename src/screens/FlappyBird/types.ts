export interface BirdType {
  x: number;
  y: number;
  velocity: number;
  size: number;
}

export interface PipeType {
  id: string;
  x: number;
  gapY: number;
  passed: boolean;
}