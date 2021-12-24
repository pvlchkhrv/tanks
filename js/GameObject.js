import {store} from './redux/store.js';

export class GameObject {
  constructor(position) {
    this.type = 'gameObject';
    this.className = 'game-object';
    this.map = document.getElementById('game-map');
    this.borders = {
      top: position.top,
      left: position.left,
      right: position.left + 64,
      bottom: position.top + 64
    };
    this.gameObject = this.createGameObjectElement();
  }

  createGameObjectElement(additionalClassName) {
    const instance = document.createElement('div');
    instance.classList.add(this.className);
    instance.style.top = this.borders.top + 'px';
    instance.style.left = this.borders.left + 'px';
    if (additionalClassName) {
      instance.classList.add(additionalClassName);
    }
    return instance;
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
