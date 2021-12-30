import {Tank} from './Tank.js';
import {DIRECTIONS} from '../constants.js';

export class PlayerTank extends Tank {
  constructor(position) {
    super(position);
    this.type = 'playerTank';
    this.gameObject = this.createGameObjectElement('game-object__player-tank');
    this.direction = DIRECTIONS.TOP;
    this.#listen();
    this.pressedControls = [];
  }

  #listen() {
    document.addEventListener('keydown', ({code}) => {
      if (
        code === 'ArrowUp' ||
        code === 'ArrowDown' ||
        code === 'ArrowRight' ||
        code === 'ArrowLeft'
      ) {
        this.pressedControls.push(code);
      } else if (code === 'Space') {
        this.fire();
      }

      // switch (code) {
      //   case 'ArrowUp':
      //     this.pressedControls.push(code);
      //     break;
      //   case 'ArrowDown':
      //     this.direction = DIRECTIONS.BOTTOM;
      //     this.stepDown();
      //     break;
      //   case 'ArrowRight':
      //     this.direction = DIRECTIONS.RIGHT;
      //     this.stepRight();
      //     break;
      //   case 'ArrowLeft':
      //     this.direction = DIRECTIONS.LEFT;
      //     this.stepLeft();
      //     break;
      //   case 'Space':
      //     this.fire();
      //     break;
      //   default:
      //     return;
      // }
    });
  }

  move() {
    switch (this.pressedControls[this.pressedControls.length - 1]) {
      case 'ArrowUp':
        this.direction = DIRECTIONS.TOP;
        this.stepUp();
        this.pressedControls = [];
        break;
      case 'ArrowDown':
        this.direction = DIRECTIONS.BOTTOM;
        this.stepDown();
        this.pressedControls = [];
        break;
      case 'ArrowRight':
        this.direction = DIRECTIONS.RIGHT;
        this.stepRight();
        this.pressedControls = [];
        break;
      case 'ArrowLeft':
        this.direction = DIRECTIONS.LEFT;
        this.stepLeft();
        this.pressedControls = [];
        break;
      // case 'Space':
      //   this.fire();
      //   this.pressedControls = [];
      //   break;
      default:
        return;
    }
  }
}
