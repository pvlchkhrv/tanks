import {Tank} from './Tank.js';
import {CONTROL_CODES, DIRECTIONS, GAME_OBJECT_TYPES} from '../constants.js';

export class PlayerTank extends Tank {
  constructor(position) {
    super(position);
    this.type = GAME_OBJECT_TYPES.PLAYER;
    this.gameObject = this.createGameObjectElement('game-object__player-tank');
    this.pressedControls = [];
    this.#listen();
  }

  #listen() {
    document.addEventListener('keydown', ({code}) => {
      if (CONTROL_CODES.find(control => code === control)) {
        this.pressedControls.push(code);
      } else if (code === 'Space') {
        this.fire();
      }
    });

    document.addEventListener('keyup', ({code}) => {
      if (CONTROL_CODES.find(control => code === control)) {
        this.pressedControls = this.pressedControls.filter(control => control !== code);
      }
    });
  }

  move() {
    switch (this.pressedControls [this.pressedControls.length - 1]) {
      case CONTROL_CODES[0]:
        this.direction = DIRECTIONS.TOP;
        this.stepUp();
        break;
      case CONTROL_CODES[1]:
        this.direction = DIRECTIONS.BOTTOM;
        this.stepDown();
        break;
      case CONTROL_CODES[2]:
        this.direction = DIRECTIONS.RIGHT;
        this.stepRight();
        break;
      case CONTROL_CODES[3]:
        this.direction = DIRECTIONS.LEFT;
        this.stepLeft();
        break;
      default:
        return;
    }
  }
}
