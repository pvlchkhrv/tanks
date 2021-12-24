export const ADD_ENEMY_TANK = 'ADD_ENEMY_TANK';
export const ADD_WALL = 'ADD_WALL';
export const ADD_PLAYER_TANK = 'ADD_PLAYER_TANK';
export const ADD_BULLET = 'ADD_BULLET';
export const DECREMENT_LIVES = 'DECREMENT_LIVES';
export const DECREMENT_ENEMY_TANKS_COUNT = 'DECREMENT_ENEMY_TANKS_COUNT';
export const DELETE_ENEMY_TANK = 'DELETE_ENEMY_TANK';
export const DELETE_PLAYER_TANK = 'DELETE_PLAYER_TANK';
export const DELETE_BULLET = 'DELETE_BULLET';
export const DELETE_WALL = 'DELETE_WALL';


export function reducer(state, action) {
  switch(action.type) {
    case ADD_WALL:
      return {...state, walls: [...state.walls, action.payload]};
    case DELETE_WALL:
      return {...state, walls: [...state.walls.filter(wall => wall && wall.id !== action.payload)]};
    case ADD_ENEMY_TANK:
      return {...state, enemyTanks: [...state.enemyTanks, action.payload]};
    case DELETE_ENEMY_TANK:
      return {...state,
        enemyTanks: [...state.enemyTanks.filter(enemyTank => enemyTank && enemyTank.id !== action.payload)]};
    case ADD_PLAYER_TANK:
      return {...state, playerTank: action.payload};
    case DELETE_PLAYER_TANK:
      return {...state, playerTank: null};
    case ADD_BULLET:
      return {...state, bullets: [...state.bullets, action.payload]};
    case DELETE_BULLET:
      return {...state, bullets: [...state.bullets.filter(bullet => bullet && bullet.id !== action.payload)]};
    case DECREMENT_LIVES:
      return {...state, lives: state.lives - 1};
      case DECREMENT_ENEMY_TANKS_COUNT:
      return {...state, enemyTanksCount: state.enemyTanksCount - 1};
    default:
      return state;
  }
}
