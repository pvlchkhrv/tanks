import {GameObject} from "./GameObject.js";

export class Bullet extends GameObject {
  constructor(position) {
    super(position);
    this.position = {
      top: position.top,
      left: `${parseInt(position.left) + 64/2 - 7 }px`
    }
    console.log(this.position)
    this.gameObject = this.createGameObject('game-object__bullet');
  }
}
