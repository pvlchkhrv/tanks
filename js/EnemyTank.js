import {Tank} from './Tank.js';

export class EnemyTank extends Tank{
  constructor(position) {
    super(position);
    this.gameObject = this.createGameObject('game-object__enemy-tank');
  }

  move(direction) {

  }
}
