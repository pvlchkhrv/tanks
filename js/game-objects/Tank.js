import {GameObject} from './GameObject.js';
import {Bullet} from './Bullet.js';
import {store} from '../store/store.js';
import {addBullet} from '../store/actionCreators.js';
import {MAP_LEGEND} from '../constants.js';

export class Tank extends GameObject {
  constructor(position) {
    super(position);
    this.bullet = null;
  }

  stepRight() {
    this.gameObject.style.transform = 'rotate(90deg)';
    if (this.borders.right < MAP_LEGEND.MAP_RIGHT && !this.hasObjectCollisions()) {
      this.moveObject(MAP_LEGEND.BLOCK_SIZE, 0);
      return true;
    }
    return false;
  }

  stepLeft() {
    this.gameObject.style.transform = 'rotate(270deg)';
    if (this.borders.left > MAP_LEGEND.MAP_LEFT && !this.hasObjectCollisions()) {
      this.moveObject(-MAP_LEGEND.BLOCK_SIZE, 0);
      return true
    }
    return false;
  }

  stepUp() {
    this.gameObject.style.transform = 'rotate(0deg)';
    if (this.borders.top > MAP_LEGEND.MAP_TOP && !this.hasObjectCollisions()) {
      this.moveObject(0, -MAP_LEGEND.BLOCK_SIZE);
      return true;
    }
    return false
  }

  stepDown() {
    this.gameObject.style.transform = 'rotate(180deg)'
    if (this.borders.bottom < MAP_LEGEND.MAP_BOTTOM && !this.hasObjectCollisions()) {
      this.moveObject(0, MAP_LEGEND.BLOCK_SIZE);
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
