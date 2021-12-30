import {Tank} from './Tank.js';
import {DIRECTIONS} from '../constants.js';

export class EnemyTank extends Tank{
  constructor(position) {
    super(position);
    this.type = 'enemyTank';
    this.gameObject = this.createGameObjectElement('game-object__enemy-tank');
    this.direction = Math.floor(Math.random() * 4);
  }

  chooseDirection() {
    this.direction = Math.floor(Math.random() * 4);
    this.randomMove();
  }

  randomMove() {
    switch(this.direction) {
      case DIRECTIONS.TOP:
        !this.stepUp() && this.chooseDirection();
        break;
      case DIRECTIONS.BOTTOM:
        !this.stepDown() && this.chooseDirection();
        break;
      case DIRECTIONS.LEFT:
        !this.stepLeft() && this.chooseDirection();
        break;
      case DIRECTIONS.RIGHT:
        !this.stepRight() && this.chooseDirection();
        break;
      default:
        return;
    }
  }
}
