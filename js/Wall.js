import {GameObject} from "./GameObject.js";

export class Wall extends GameObject {
  constructor(position) {
    super(position);
    this.className = 'game-object__wall';
    console.log(this.className)
    this.gameObject = this.createGameObjectElement();
  }
}
