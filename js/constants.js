export const GAME_TIMER_INTERVAL = 1000;
export let IS_GAME_OVER = false;

export const MAP = [
  [2, 0, 0, 3, 0, 0, 2, 0, 0, 3, 0, 0, 2],
  [0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0, 3, 3, 3, 0, 0],
  [0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 3, 0, 3, 0, 0, 0, 0, 0]
]

export const MAP_LEGEND = {
  MAP_TOP: 0,
  MAP_LEFT: 0,
  MAP_RIGHT: 832,
  MAP_BOTTOM: 896,
  PLAYER_BASE: 1,
  ENEMY_BASE: 2,
  WALL: 3,
  ENEMY_BASE_COORDINATES: [],
  PLAYER_BASE_COORDINATES: {},
  BLOCK_SIZE: 64,
  BULLET_SIZE: 6,
  BULLET_SPEED: 4,
  ENEMY_COUNT: 3
}

export const DIRECTIONS = {
  TOP: 0,
  BOTTOM: 1,
  LEFT: 2,
  RIGHT: 3
}

export const INITIAL_STATE = {
  lives: 3,
  enemyTanksCount: 21,
  enemyTanks: [],
  walls: [],
  playerTank: null,
  bullets: [],
}

export const GAME_OBJECT_TYPES =  {
  PLAYER: 'PLAYER',
  WALL: 'WALL',
  ENEMY: 'ENEMY',
  BULLET: 'BULLET'
}

export const CONTROL_CODES = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];
