import {Wall} from "./Wall.js";
import {PlayerTank} from "./PlayerTank.js";
import {EnemyTank} from "./EnemyTank.js";
import {store} from './redux/store.js';
import {addEnemyTank, addPlayerTank, addWall, decrementEnemyTanksCount} from "./redux/actionCreators.js";

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
  PLAYER_BASE: 1,
  ENEMY_BASE: 2,
  WALL: 3,
  ENEMY_BASE_COORDINATES: [],
  PLAYER_BASE_COORDINATES: {}
}

let instance;

export class Map {
  constructor() {
    this.map = document.getElementById('game-map');
    this.walls = [];
    this.enemyTanks = [];
    this.playerTank = null;
    this.borders = {
      top: 0,
      left: 0,
      right: 832,
      bottom: 896
    }
    if (!instance) instance = this;
    return instance;
  }

  init() {
    MAP.forEach((y, yIndex) => y.forEach((x, xIndex) => {
      const Y = yIndex * 64;
      const X = xIndex * 64;

      switch (x) {
        case MAP_LEGEND.WALL:
          const wall = new Wall({top: Y, left: X});
          store.dispatch(addWall(wall));
          this.walls.push(wall.borders);
          wall.render();
          break;
        case MAP_LEGEND.PLAYER_BASE:
          this.playerTank = new PlayerTank({top: Y, left: X});
          store.dispatch(addPlayerTank(this.playerTank));
          this.playerTank.render();
          MAP_LEGEND.PLAYER_BASE_COORDINATES = {top: Y, left: X};
          break;
        case  MAP_LEGEND.ENEMY_BASE:
          const enemyTank = new EnemyTank({top: Y, left: X});
          enemyTank.gameObject.style.transform = 'rotate(180deg)';
          store.dispatch(addEnemyTank(enemyTank));
          this.enemyTanks.push(enemyTank);
          enemyTank.render();
          MAP_LEGEND.ENEMY_BASE_COORDINATES.push({top: Y, left: X});
          break;
        default:
          return;
      }
    }));
  }

  update() {
    if (!store.getState().playerTank) {
      this.playerTank = new PlayerTank(MAP_LEGEND.PLAYER_BASE_COORDINATES);
      store.dispatch(addPlayerTank(this.playerTank));
      this.playerTank.render();
    }
    if (store.getState().enemyTanks.length < 3) {
      const random = Math.floor(Math.random() * 3);
      const enemyTank = new EnemyTank(MAP_LEGEND.ENEMY_BASE_COORDINATES[random]);
      enemyTank.gameObject.style.transform = 'rotate(180deg)';
      store.dispatch(addEnemyTank(enemyTank));
      store.dispatch(decrementEnemyTanksCount());
      this.enemyTanks.push(enemyTank);
      enemyTank.render();
    }

    this.enemyTanks.forEach(enemyTank => {
        enemyTank.randomMove();
        enemyTank.fire();
    });
    const bullets = store.getState().bullets;
    bullets.forEach( bullet => bullet.move());
  }
}
