import {Wall} from '../game-objects/Wall.js';
import {PlayerTank} from '../game-objects/PlayerTank.js';
import {EnemyTank} from '../game-objects/EnemyTank.js';
import {store} from '../store/store.js';
import {addEnemyTank, addPlayerTank, addWall, initialize} from '../store/actionCreators.js';
import {INITIAL_STATE, MAP, MAP_LEGEND} from '../constants.js';

let instance;

export class Map {
  constructor() {
    this.map = document.getElementById('game-map');
    if (!instance) instance = this;
    return instance;
  }

  init() {
    store.dispatch(initialize(INITIAL_STATE));

    MAP.forEach((y, yIndex) => y.forEach((x, xIndex) => {
      const Y = yIndex * MAP_LEGEND.BLOCK_SIZE;
      const X = xIndex * MAP_LEGEND.BLOCK_SIZE;

      switch (x) {
        case MAP_LEGEND.WALL:
          const wall = new Wall({top: Y, left: X});
          store.dispatch(addWall(wall));
          wall.render();
          break;
        case MAP_LEGEND.PLAYER_BASE:
          const playerTank = new PlayerTank({top: Y, left: X});
          store.dispatch(addPlayerTank(playerTank));
          playerTank.render();
          MAP_LEGEND.PLAYER_BASE_COORDINATES = {top: Y, left: X};
          break;
        case  MAP_LEGEND.ENEMY_BASE:
          const enemyTank = new EnemyTank({top: Y, left: X});
          enemyTank.gameObject.style.transform = 'rotate(180deg)';
          store.dispatch(addEnemyTank(enemyTank));
          enemyTank.render();
          MAP_LEGEND.ENEMY_BASE_COORDINATES.push({top: Y, left: X});
          break;
        default:
          return;
      }
    }));
  }

  update() {
    const enemyTanks = store.getState().enemyTanks;
    const lives = store.getState().lives;
    const enemyTanksCount = store.getState().enemyTanksCount;
    let playerTank = store.getState().playerTank;

    // playerTank respawn
    if (!playerTank) {
      playerTank = new PlayerTank(MAP_LEGEND.PLAYER_BASE_COORDINATES);
      store.dispatch(addPlayerTank(playerTank));
      playerTank.render();
    }

    // enemy tanks respawn
    if (enemyTanks.length < MAP_LEGEND.ENEMY_COUNT) {
      const random = Math.floor(Math.random() * MAP_LEGEND.ENEMY_COUNT);
      const enemyTank = new EnemyTank(MAP_LEGEND.ENEMY_BASE_COORDINATES[random]);
      enemyTank.gameObject.style.transform = 'rotate(180deg)';
      store.dispatch(addEnemyTank(enemyTank));
      enemyTank.render();
    }

    // count moves
    enemyTanks.forEach(enemyTank => {
      enemyTank.randomMove();
      enemyTank.fire()
    });

    playerTank.move();

    // counters
    const livesCounterElement = document.querySelector('#lives');
    livesCounterElement.innerText = `${lives}`;

    const enemyCounterElement = document.querySelector('#enemy-counter');
    enemyCounterElement.innerText = `${enemyTanksCount}`
  }
}
