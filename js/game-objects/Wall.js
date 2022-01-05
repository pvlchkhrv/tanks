import {GameObject} from './GameObject.js';
import {GAME_OBJECT_TYPES} from '../constants.js';

export class Wall extends GameObject {
  constructor(position) {
    super(position);
    this.type = GAME_OBJECT_TYPES.WALL;
    this.gameObject = this.createGameObjectElement('game-object__wall');
  }

  getTanksAndWalls() {}

  hasObjectCollisions() {}

  moveObject() {}
}

