import {GameObject} from './GameObject.js';
import {Bullet} from './Bullet.js';
import {store} from './redux/store.js';
import {addBullet} from "./redux/actionCreators.js";

export class Tank extends GameObject {
  constructor(position) {
    super(position);
    this.type = 'tank';
    this.isDamaged = false;
    this.bullet = null;
  }

  hasWallsCollisionsRight(walls) {
    return walls.some(wall =>
      this.borders.right === wall.borders.left && wall.borders.top === this.borders.top);
  }

  handleWallsCollisionsLeft(walls) {
    return walls.some(wall =>
      this.borders.left === wall.borders.right && wall.borders.top === this.borders.top);
  }

  handleWallsCollisionsUp(walls) {
    return walls.some(wall =>
      this.borders.top === wall.borders.bottom && wall.borders.right === this.borders.right);
  }

  handleWallsCollisionsDown(walls) {
    return walls.some(wall =>
      this.borders.bottom === wall.borders.top && wall.borders.right === this.borders.right);
  }

  handleTanksCollisionsRight() {
    const playerTank = store.getState().playerTank;
    const enemyTanks = store.getState().enemyTanks.filter(enemyTank => enemyTank.id !== this.gameObject.id);
    const tanks = [playerTank, ...enemyTanks];
    return tanks.some(tank =>
      this.borders.right === tank.borders.left && tank.borders.top === this.borders.top);
  }

  handleTanksCollisionsLeft() {
    const playerTank = store.getState().playerTank;
    const enemyTanks = store.getState().enemyTanks.filter(enemyTank => enemyTank.id !== this.gameObject.id);
    const tanks = [playerTank, ...enemyTanks];
    return tanks.some(tank =>
      this.borders.left === tank.borders.right && tank.borders.top === this.borders.top);
  }

  handleTanksCollisionsUp() {
    const playerTank = store.getState().playerTank;
    const enemyTanks = store.getState().enemyTanks.filter(enemyTank => enemyTank.id !== this.gameObject.id);
    const tanks = [playerTank, ...enemyTanks];
    return tanks.some(tank =>
      this.borders.top === tank.borders.bottom && tank.borders.right === this.borders.right);
  }

  handleTanksCollisionsDown() {
    const playerTank = store.getState().playerTank;
    const enemyTanks = store.getState().enemyTanks.filter(enemyTank => enemyTank.id !== this.gameObject.id);
    const tanks = [playerTank, ...enemyTanks];
    return tanks.some(tank =>
      this.borders.bottom === tank.borders.top && tank.borders.right === this.borders.right);
  }

  stepRight() {
    const walls = store.getState().walls;
    if (this.borders.right < 832 && !this.hasWallsCollisionsRight(walls) && !this.handleTanksCollisionsRight()) {
      this.gameObject.style.transform = 'rotate(90deg)';
      this.moveObject(64, 0);
      return true;
    }
    return false;
  }

  stepLeft() {
    const walls = store.getState().walls;
    if (this.borders.left > 0 && !this.handleWallsCollisionsLeft(walls) && !this.handleTanksCollisionsLeft()) {
      this.gameObject.style.transform = 'rotate(270deg)';
      this.moveObject(-64, 0);
      return true
    }
    return false;
  }

  stepUp() {
    const walls = store.getState().walls;
    if (this.borders.top > 0 && !this.handleWallsCollisionsUp(walls) && !this.handleTanksCollisionsUp()) {
      this.gameObject.style.transform = 'rotate(0deg)';
      this.moveObject(0, -64);
      return true;
    }
    return false
  }

  stepDown() {
    const walls = store.getState().walls;
    if (this.borders.bottom < 896 && !this.handleWallsCollisionsDown(walls) && !this.handleTanksCollisionsDown()) {
      this.gameObject.style.transform = 'rotate(180deg)'
      this.moveObject(0, 64);
      return true;
    }
    return false;
  }

  fire() {
    this.bullet = new Bullet(this);
    store.dispatch(addBullet(this.bullet));
    this.bullet.render();
  }
}
