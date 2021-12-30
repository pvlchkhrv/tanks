import {MAP_LEGEND} from "../constants.js";

export class GameObject {
  constructor(position) {
    this.type = 'gameObject';
    this.className = 'game-object';
    this.map = document.getElementById('game-map');
    this.borders = {
      top: position.top,
      left: position.left,
      right: position.left + MAP_LEGEND.BLOCK_SIZE,
      bottom: position.top + MAP_LEGEND.BLOCK_SIZE
    };
    this.id = Date.now().toString() + Math.floor(Math.random() * 1000);
    this.gameObject = this.createGameObjectElement();
  }

  createGameObjectElement(additionalClassName) {
    const gameObjectElement = document.createElement('div');
    gameObjectElement.classList.add(this.className);
    gameObjectElement.style.top = this.borders.top + 'px';
    gameObjectElement.style.left = this.borders.left + 'px';
    if (additionalClassName) {
      gameObjectElement.classList.add(additionalClassName);
    }
    return gameObjectElement;
  }

  moveObject(x, y) {
    this.borders.top = this.borders.top + y;
    this.borders.bottom = this.borders.bottom + y;
    this.borders.left = this.borders.left + x;
    this.borders.right = this.borders.right + x;
    this.gameObject.style.top = this.borders.top + 'px';
    this.gameObject.style.left = this.borders.left + 'px';
  }

  render() {
    this.map.append(this.gameObject);
  }

  destroy() {
    this.gameObject.remove();
  }
}
