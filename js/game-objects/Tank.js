import {GameObject} from './GameObject.js';
import {Bullet} from './Bullet.js';
import {store} from '../store/store.js';
import {addBullet} from '../store/actionCreators.js';
import {DIRECTIONS} from '../constants.js';

export class Tank extends GameObject {
  constructor(position) {
    super(position);
    this.type = 'tank';
    this.bullet = null;
  }

  hasObjectCollision() {
    const walls = store.getState().walls;
    const playerTank = store.getState().playerTank;
    const enemyTanks = store.getState().enemyTanks.filter(enemyTank => enemyTank.id !== this.gameObject.id);
    const gameObjects = [playerTank, ...enemyTanks, ...walls];

    switch (this.direction) {
      case DIRECTIONS.TOP:
        return gameObjects.find(gameObject =>
          this.borders.top === gameObject.borders.bottom && gameObject.borders.right === this.borders.right);
      case DIRECTIONS.BOTTOM:
        return gameObjects.find(gameObject =>
          this.borders.bottom === gameObject.borders.top && gameObject.borders.right === this.borders.right);
      case DIRECTIONS.LEFT:
        return gameObjects.find(gameObject =>
          this.borders.left === gameObject.borders.right && gameObject.borders.top === this.borders.top);
      case DIRECTIONS.RIGHT:
        return gameObjects.find(gameObject =>
          this.borders.right === gameObject.borders.left && gameObject.borders.top === this.borders.top);
      default:
        return;
    }
  }

  stepRight() {
    if (this.borders.right < 832 && !this.hasObjectCollision()) {
      this.gameObject.style.transform = 'rotate(90deg)';
      this.moveObject(64, 0);
      return true;
    }
    return false;
  }

  stepLeft() {
    if (this.borders.left > 0 && !this.hasObjectCollision()) {
      this.gameObject.style.transform = 'rotate(270deg)';
      this.moveObject(-64, 0);
      return true
    }
    return false;
  }

  stepUp() {
    if (this.borders.top > 0 && !this.hasObjectCollision()) {
      this.gameObject.style.transform = 'rotate(0deg)';
      this.moveObject(0, -64);
      return true;
    }
    return false
  }

  stepDown() {
    if (this.borders.bottom < 896 && !this.hasObjectCollision()) {
      this.gameObject.style.transform = 'rotate(180deg)'
      this.moveObject(0, 64);
      return true;
    }
    return false;
  }

  animateBulletMove() {
    if (this.bullet) {
      this.bullet.move();
      requestAnimationFrame(() => this.animateBulletMove());
    }
  }

  fire() {
    if (!this.bullet) {
      this.bullet = new Bullet(this);
      store.dispatch(addBullet(this.bullet));
      this.bullet.render();
      this.animateBulletMove();
    }
  }
}
