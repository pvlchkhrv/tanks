import {GameObject} from "./GameObject.js";
import {deleteBullet, deleteEnemyTank, deletePlayerTank, deleteWall} from "./redux/actionCreators.js";
import {store} from './redux/store.js'

export class Bullet extends GameObject {
  constructor(tank) {
    super({top: tank.borders.top + 64 / 2 - 6 / 2, left: tank.borders.left + 64 / 2 + 6 / 2});
    this.tank = tank;
    this.direction = tank.direction;
    this.borders = {
      ...this.borders,
      right: this.borders.left + 6,
      bottom: this.borders.top + 6
    }
    this.gameObject = this.createGameObjectElement('game-object__bullet');
  }

  move() {
    if (this.checkBorderCollisions() && !this.checkObjectCollisions()) {
      switch (this.direction) {
        case 0:
          this.moveObject(0, -64);
          break;
        case 1:
          this.moveObject(0, 64);
          break;
        case 2:
          this.moveObject(-64, 0);
          break;
        case 3:
          this.moveObject(64, 0);
          break;
        default:
          return
      }
    } else {
      store.dispatch(deleteBullet(this.id));
      this.destroy();
    }
  }

  checkBorderCollisions() {
    switch (this.direction) {
      case 0:
        if (this.borders.top < 0) {
          this.destroy();
          store.dispatch(deleteBullet(this));
          return false;
        }
        return true
      case 1:
        if (this.borders.bottom > 896) {
          this.destroy();
          store.dispatch(deleteBullet(this));
          return false;
        }
        return true
      case 2:
        if (this.borders.left < 0) {
          this.destroy();
          store.dispatch(deleteBullet(this));
          return false;
        }
        return true
      case 3:
        if (this.borders.left > 832) {
          this.destroy();
          store.dispatch(deleteBullet(this));
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
        store.dispatch(deleteBullet(this.id));
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
          store.dispatch(deleteEnemyTank(tank.id));
          store.dispatch(deleteBullet(this.id));
          this.destroy();
          tank.destroy();
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
        store.dispatch(deleteBullet(this.id));
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
    if(gameObject) {
      return this.borders.left < gameObject.borders.right &&
        this.borders.right > gameObject.borders.left &&
        this.borders.bottom > gameObject.borders.top &&
        this.borders.top < gameObject.borders.bottom;
    }
  }
  destroy() {
    super.destroy();
    this.tank.bullet = null;
  }
}
