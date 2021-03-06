import {
  ADD_ENEMY_TANK,
  ADD_PLAYER_TANK,
  ADD_WALL,
  ADD_BULLET,
  DELETE_BULLET,
  DELETE_ENEMY_TANK,
  DELETE_PLAYER_TANK,
  DELETE_WALL,
  DECREMENT_ENEMY_TANKS_COUNT,
  DECREMENT_LIVES, INITIALIZE,
} from './reducer.js';

export const addEnemyTank = (payload) => ({type: ADD_ENEMY_TANK, payload});
export const addWall = (payload) => ({type: ADD_WALL, payload});
export const addPlayerTank = (payload) =>({type: ADD_PLAYER_TANK, payload});
export const addBullet = (payload) => ({type: ADD_BULLET, payload});
export const deleteBullet = (payload) => ({type: DELETE_BULLET, payload});
export const deleteEnemyTank = (payload) => ({type: DELETE_ENEMY_TANK, payload});
export const deletePlayerTank = () => ({type: DELETE_PLAYER_TANK});
export const deleteWall = (payload) => ({type: DELETE_WALL, payload});
export const decrementEnemyTanksCount = () => ({type: DECREMENT_ENEMY_TANKS_COUNT});
export const decrementLive = () => ({type: DECREMENT_LIVES});
export const initialize = (payload) => ({type: INITIALIZE, payload});
