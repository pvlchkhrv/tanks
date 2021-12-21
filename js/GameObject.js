export class GameObject {
  constructor(position) {
    this.type = 'gameObject';
    this.className = 'game-object';
    this.position = position;
    this.gameObject = this.createGameObjectElement();
    this.map = document.querySelector('#game-map');
    console.log(this.position)
  }

  createGameObjectElement() {
    const instance = document.createElement('div');
    instance.classList.add(this.className);
    instance.style.top = this.position.top;
    instance.style.left = this.position.left;
    return instance;
  }

  moveElement() {
    this.gameObject.style.top = this.position.top;
    this.gameObject.style.left = this.position.left;
  }

  render() {
    this.map.append(this.gameObject);
  }

  destroy() {
    this.gameObject.remove();
  }
}
