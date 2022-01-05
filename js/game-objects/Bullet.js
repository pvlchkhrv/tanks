import {GameObject} from './GameObject.js';
import {
  decrementEnemyTanksCount, decrementLive,
  deleteBullet,
  deleteEnemyTank,
  deletePlayerTank,
  deleteWall
} from '../store/actionCreators.js';
import {store} from '../store/store.js'
import {DIRECTIONS, GAME_OBJECT_TYPES, MAP_LEGEND} from '../constants.js';

export class Bullet extends GameObject {
  constructor(tank) {
    super({
      top: tank.borders.top + MAP_LEGEND.BLOCK_SIZE / 2 - MAP_LEGEND.BULLET_SIZE / 2,
      left: tank.borders.left + MAP_LEGEND.BLOCK_SIZE / 2 + MAP_LEGEND.BULLET_SIZE / 2
    });
    this.borders = {
      ...this.borders,
      right: this.borders.left + MAP_LEGEND.BULLET_SIZE,
      bottom: this.borders.top + MAP_LEGEND.BULLET_SIZE
    }
    this.tank = tank;
    this.type = GAME_OBJECT_TYPES.BULLET;
    this.direction = tank.direction;
    this.gameObject = this.createGameObjectElement('game-object__bullet');
  }

  move() {
    this.handleBorderCollision();
    this.handleObjectCollision();

    switch (this.direction) {
      case DIRECTIONS.TOP:
        this.moveObject(0, -MAP_LEGEND.BULLET_SPEED);
        break;
      case DIRECTIONS.BOTTOM:
        this.moveObject(0, MAP_LEGEND.BULLET_SPEED);
        break;
      case DIRECTIONS.LEFT:
        this.moveObject(-MAP_LEGEND.BULLET_SPEED, 0);
        break;
      case DIRECTIONS.RIGHT:
        this.moveObject(MAP_LEGEND.BULLET_SPEED, 0);
        break;
      default:
        return
    }
  }

  handleObjectCollision() {
    const collidedObject = this.hasObjectCollisions();
    if (!collidedObject) return;

    if (collidedObject.type === GAME_OBJECT_TYPES.WALL) {
      store.dispatch(deleteWall(collidedObject.id));
      this.destroy();
      collidedObject.destroy();
    }

    if (this.tank.type === GAME_OBJECT_TYPES.PLAYER && collidedObject.type === GAME_OBJECT_TYPES.ENEMY) {
      store.dispatch(deleteEnemyTank(collidedObject.id));
      store.dispatch(decrementEnemyTanksCount());
      this.destroy();
      collidedObject.destroy();
    }

    if (this.tank.type === GAME_OBJECT_TYPES.ENEMY && collidedObject.type === GAME_OBJECT_TYPES.PLAYER) {
      store.dispatch(deletePlayerTank());
      store.dispatch(decrementLive());
      this.destroy();
      collidedObject.destroy();
    }
  }


  handleBorderCollision() {
    if (this.borders.top < MAP_LEGEND.MAP_TOP
      || this.borders.bottom > MAP_LEGEND.MAP_BOTTOM
      || this.borders.left < MAP_LEGEND.MAP_LEFT
      || this.borders.right > MAP_LEGEND.MAP_RIGHT) {
      this.destroy();
    }
  };

  destroy() {
    super.destroy();
    this.tank.bullet = null;
    store.dispatch(deleteBullet(this.id));
  }
}
