import {DIRECTIONS, GAME_OBJECT_TYPES, MAP_LEGEND} from '../constants.js';
import {store} from '../store/store.js';
import {getId} from '../helpers.js';

export class GameObject {
  constructor(position) {
    this.type = null;
    this.className = 'game-object';
    this.map = document.getElementById('game-map');
    this.borders = {
      top: position.top,
      left: position.left,
      right: position.left + MAP_LEGEND.BLOCK_SIZE,
      bottom: position.top + MAP_LEGEND.BLOCK_SIZE
    };
    this.direction = null;
    this.id = getId();
    this.gameObject = this.createGameObjectElement();
  }

  createGameObjectElement(additionalClassName) {
    const gameObjectElement = document.createElement('div');
    gameObjectElement.classList.add(this.className);
    gameObjectElement.style.top = this.borders.top + 'px';
    gameObjectElement.style.left = this.borders.left + 'px';
    if (additionalClassName) {
      gameObjectElement.classList.add(additionalClassName);
    }
    return gameObjectElement;
  }

  hasObjectCollisions() {
    const state = store.getState();
    const gameObjects = [
      ...state.enemyTanks.filter(tank => tank.id !== this.id),
      ...state.walls,
      state.playerTank];

    if (this.type === GAME_OBJECT_TYPES.PLAYER || this.type === GAME_OBJECT_TYPES.ENEMY) {
      switch (this.direction) {
        case DIRECTIONS.TOP:
          return gameObjects.some(gameObject => {
            return this.borders.top === gameObject.borders.bottom && gameObject.borders.right === this.borders.right;
          });
        case DIRECTIONS.BOTTOM:
          return gameObjects.some(gameObject =>
            this.borders.bottom === gameObject.borders.top && gameObject.borders.right === this.borders.right);
        case DIRECTIONS.LEFT:
          return gameObjects.some(gameObject =>
            this.borders.left === gameObject.borders.right && gameObject.borders.top === this.borders.top);
        case DIRECTIONS.RIGHT:
          return gameObjects.some(gameObject =>
            this.borders.right === gameObject.borders.left && gameObject.borders.top === this.borders.top);
        default:
          return;
      }
    }

    if (this.type === GAME_OBJECT_TYPES.BULLET) {
      return gameObjects.find(gameObject => {
        if (gameObject) {
          return this.borders.left <= gameObject.borders.right &&
            this.borders.right >= gameObject.borders.left &&
            this.borders.bottom >= gameObject.borders.top &&
            this.borders.top <= gameObject.borders.bottom;
        }
      })
    }
  }

  moveObject(x, y) {
    this.borders.top = this.borders.top + y;
    this.borders.bottom = this.borders.bottom + y;
    this.borders.left = this.borders.left + x;
    this.borders.right = this.borders.right + x;
    this.gameObject.style.top = this.borders.top + 'px';
    this.gameObject.style.left = this.borders.left + 'px';
  }

  render() {
    this.map.append(this.gameObject);
  }

  destroy() {
    this.gameObject.remove();
  }
}
