import {GameObject} from './GameObject.js';
import {
  decrementEnemyTanksCount, decrementLive,
  deleteBullet,
  deleteEnemyTank,
  deletePlayerTank,
  deleteWall
} from '../store/actionCreators.js';
import {store} from '../store/store.js'
import {DIRECTIONS, MAP_LEGEND} from '../constants.js';

export class Bullet extends GameObject {
  constructor(tank) {
    super({
      top: tank.borders.top + MAP_LEGEND.BLOCK_SIZE / 2 - MAP_LEGEND.BULLET_SIZE / 2,
      left: tank.borders.left + MAP_LEGEND.BLOCK_SIZE / 2 + MAP_LEGEND.BULLET_SIZE / 2
    });
    this.tank = tank;
    this.direction = tank.direction;
    this.borders = {
      ...this.borders,
      right: this.borders.left + MAP_LEGEND.BULLET_SIZE,
      bottom: this.borders.top + MAP_LEGEND.BULLET_SIZE
    }
    this.gameObject = this.createGameObjectElement('game-object__bullet');
  }

  move() {
    if (this.checkBorderCollisions() && !this.checkObjectCollisions()) {
      switch (this.direction) {
        case DIRECTIONS.TOP:
          this.moveObject(0, -4);
          break;
        case DIRECTIONS.BOTTOM:
          this.moveObject(0, 4);
          break;
        case DIRECTIONS.LEFT:
          this.moveObject(-4, 0);
          break;
        case DIRECTIONS.RIGHT:
          this.moveObject(4, 0);
          break;
        default:
          return
      }
    } else {
      this.destroy();
    }
  }

  checkBorderCollisions() {
    switch (this.direction) {
      case DIRECTIONS.TOP:
        if (this.borders.top < 0) {
          this.destroy();
          return false;
        }
        return true
      case DIRECTIONS.BOTTOM:
        if (this.borders.bottom > 896) {
          this.destroy();
          return false;
        }
        return true
      case DIRECTIONS.LEFT:
        if (this.borders.left < 0) {
          this.destroy();
          return false;
        }
        return true
      case DIRECTIONS.RIGHT:
        if (this.borders.left > 832) {
          this.destroy();
          return false;
        }
        return true;
    }
  };

  checkObjectCollisions() {
    let isCollided = false;

    const walls = store.getState().walls;
    walls.forEach(wall => {
      if (this.isCollided(wall)) {
        store.dispatch(deleteWall(wall.id));
        this.destroy();
        wall.destroy();
        isCollided = true;
      } else {
        isCollided = false;
      }
    })

    if (this.tank.type === 'playerTank') {
      const enemyTanks = store.getState().enemyTanks;
      enemyTanks.forEach(tank => {
        if (this.isCollided(tank)) {
          console.log('enemyTank bullet collision')
          this.destroy();
          tank.destroy();
          store.dispatch(deleteEnemyTank(tank.id));
          store.dispatch(decrementEnemyTanksCount());
          isCollided = true;
        } else {
          isCollided = false;
        }
      })
    }

    if (this.tank.type === 'enemyTank') {
      const playerTank = store.getState().playerTank;
      if (this.isCollided(playerTank)) {
        store.dispatch(deletePlayerTank(playerTank));
        store.dispatch(decrementLive());
        this.destroy();
        playerTank.destroy();
        isCollided = true;
      } else {
        isCollided = false;
      }
    }
    return isCollided;
  }

  isCollided(gameObject) {
    if (gameObject) {
      return this.borders.left < gameObject.borders.right &&
        this.borders.right > gameObject.borders.left &&
        this.borders.bottom > gameObject.borders.top &&
        this.borders.top < gameObject.borders.bottom;
    }
  }

  destroy() {
    super.destroy();
    this.tank.bullet = null;
    store.dispatch(deleteBullet(this.id));
  }
}
