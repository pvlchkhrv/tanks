import {Tank} from './Tank.js';

export class PlayerTank extends Tank{
  constructor(position) {
    super(position);
    this.type = 'playerTank';
    this.gameObject = this.createGameObjectElement('game-object__player-tank');
    this.direction = 0;
    this.#listen();
  }

  #listen() {
    document.addEventListener('keydown', ({code}) => {
      switch (code) {
        case 'ArrowUp':
          this.direction = 0;
          super.stepUp();
          break;
        case 'ArrowDown':
          this.direction = 1;
          super.stepDown();
          break;
        case 'ArrowRight':
          this.direction = 3;
          super.stepRight();
          break;
        case 'ArrowLeft':
          this.direction = 2;
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

  respawn(position) {
    this.position = position;
  }

}
