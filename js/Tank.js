import {GameObject} from "./GameObject.js";
import {Bullet} from "./Bullet.js";

export class Tank extends GameObject {
  constructor(position) {
    super(position);
    this.type = 'tank';
    this.isShoted = false;
    this.bullet = null;
  }

  stepRight() {
    this.position.left = `${(parseInt(this.position.left) + 5)}px`;
    this.gameObject.style.left = this.position.left;
    this.gameObject.style.transform = 'rotate(90deg)'
  }

  stepLeft() {
    this.position.left = `${(parseInt(this.position.left) - 5)}px`;
    this.gameObject.style.left = this.position.left;
    this.gameObject.style.transform = 'rotate(-90deg)'
  }

  stepUp() {
    this.position.top = `${(parseInt(this.position.top) - 5)}px`;
    this.gameObject.style.top = this.position.top;
    this.gameObject.style.transform = 'rotate(0deg)'
  }

  stepDown() {
    this.position.top = `${(parseInt(this.position.top) + 5)}px`;
    this.gameObject.style.top = this.position.top;
    this.gameObject.style.transform = 'rotate(180deg)';
  }

  fire() {
    const map = document.querySelector('#game-map');
    this.bullet = new Bullet(this.position).instance;
    map.append(this.bullet)
  }



}
