import {Tank} from './Tank.js';
import {DIRECTIONS, GAME_OBJECT_TYPES} from '../constants.js';
import {getRandomDirection} from '../helpers.js';

export class EnemyTank extends Tank{
  constructor(position) {
    super(position);
    this.type = GAME_OBJECT_TYPES.ENEMY;
    this.gameObject = this.createGameObjectElement('game-object__enemy-tank');
    this.direction = getRandomDirection();
  }

  chooseDirection() {
    this.direction = getRandomDirection();
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
