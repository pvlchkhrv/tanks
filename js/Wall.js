import {GameObject} from './GameObject.js';

export class Wall extends GameObject {
  constructor(position) {
    super(position);
    this.type = 'wall';
    this.gameObject = this.createGameObjectElement('game-object__wall');
  }

  handleBulletCollision() {

  }

}
