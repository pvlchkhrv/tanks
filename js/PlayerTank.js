import {Tank} from './Tank.js';

export class PlayerTank extends Tank{
  constructor(position) {
    super(position);
    this.gameObject = this.createGameObject('game-object__player-tank');
    this.#listen();
  }

  #listen() {
    document.addEventListener('keydown', ({code}) => {
      switch (code) {
        case 'ArrowUp':
          super.stepUp();
          break;
        case 'ArrowDown':
          super.stepDown();
          break;
        case 'ArrowRight':
          super.stepRight();
          break;
        case 'ArrowLeft':
          super.stepLeft();
          break;
        case 'Space':
          super.fire();
          break;
        default:
          return;
      }
    });
  }

}
