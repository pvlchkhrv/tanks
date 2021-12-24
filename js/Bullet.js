import {GameObject} from "./GameObject.js";
import {deleteBullet, deleteEnemyTank, deletePlayerTank, deleteWall} from "./redux/actionCreators.js";
import {store} from './redux/store.js'

export class Bullet extends GameObject {
  constructor(tank) {
    super({top: tank.borders.top + 64 / 2 - 6 / 2, left: tank.borders.left + 64 / 2 + 6 / 2});
    this.tank = tank;
    this.direction = tank.direction;
    this.id = Date.now().toString();
    this.borders = {
      ...this.borders,
      right: this.borders.left + 6,
      bottom: this.borders.top + 6
    }
    this.gameObject = this.createGameObjectElement('game-object__bullet');
  }

  move() {
    if(this.checkBorderCollisions() && !this.checkObjectCollisions()) {
      switch(this.direction) {
        case 0:
          this.moveObject(0, -64 * 2);
          break;
        case 1:
          this.moveObject(0, 64 * 2);
          break;
        case 2:
          this.moveObject(-64 * 2, 0);
          break;
        case 3:
          this.moveObject(64 * 2, 0);
          break;
        default:
          return
      }
    } else {
      store.dispatch(deleteBullet(this.id));
      this.destroy();
    }
  }

  // checkObjectCollision() {
  //   const walls = store.getState().walls;
  //   const enemyTanks = store.getState().enemyTanks;
  //   const playerTank = store.getState().playerTank;
  //   walls.forEach(wall => {
  //     this.handleCollision(wall);
  //     store.dispatch(deleteWall(wall.id));
  //   })
  // }

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
        if (this.borders.left > 896) {
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
      debugger
      if(this.isCollided(wall)) {
        this.destroy();
        wall.destroy();
        store.dispatch(deleteWall(wall.id));
        store.dispatch(deleteBullet(this.id));
        isCollided = true;
      }
      isCollided = false;
    })
    return isCollided;

    // if (this.tank.type === 'playerTank') {
    //   const enemyTanks = store.getState().enemyTanks;
    //   enemyTanks.forEach(tank => {
    //     this.handleCollision(tank);
    //     store.dispatch(deleteEnemyTank(tank.id));
    //   })
    // }
    //
    // if (this.tank.type === 'enemyTank') {
    //   const playerTank = store.getState().playerTank;
    //   this.handleCollision(playerTank);
    //   store.dispatch(deletePlayerTank(playerTank.id));
    // }
  }

  isCollided(gameObject) {
    return this.borders.left < gameObject.borders.right &&
      this.borders.rigth > gameObject.borders.left &&
      this.borders.bottom > gameObject.borders.top &&
      this.borders.top < gameObject.borders.bottom;
  }

}
