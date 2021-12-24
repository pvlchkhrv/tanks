import {Tank} from './Tank.js';

export class EnemyTank extends Tank{
  constructor(position) {
    super(position);
    this.type = 'enemyTank';
    this.gameObject = this.createGameObjectElement('game-object__enemy-tank');
    this.direction = Math.floor(Math.random() * 4);
    this.id = Date.now().toString();
  }

  chooseDirection() {
    this.direction = Math.floor(Math.random() * 4);
    this.randomMove();
  }

  randomMove() {
    switch(this.direction) {
      case 0:
        !this.stepUp() && this.chooseDirection();
        break;
      case 1:
        !this.stepDown() && this.chooseDirection();
        break;
      case 2:
        !this.stepLeft() && this.chooseDirection();
        break;
      case 3:
        !this.stepRight() && this.chooseDirection();
        break;
      default:
        return;
    }
  }

  randomFire() {
    setInterval(() => this.fire(), 6000)
  }
}
