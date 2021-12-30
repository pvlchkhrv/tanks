import {store} from './store/store.js';
import {Map} from './map/Map.js';

var GAME_TIMER_INTERVAL = 1000; // задаёт интервал времени, за который будет выполняться один шаг в игре
var IS_GAME_OVER = false;

const map = new Map();
gameInitialization();

gameLoop();

function gameInitialization() {
  map.init();
}

function gameLoop() {
  if (IS_GAME_OVER !== true) {
    gameStep();
    setTimeout(function () {
      gameLoop()
    }, GAME_TIMER_INTERVAL);
  }

}

function gameStep() {
  const lives = store.getState().lives;
  const enemyTanksCount = store.getState().enemyTanksCount;
  const map = new Map();

  if (!lives) {
    IS_GAME_OVER = true;
    alert('GAME OVER');
    location.reload();
  } else if (!enemyTanksCount) {
    IS_GAME_OVER = true;
    alert('YOU WIN');
    location.reload()
  } else {
    map.update()
  }
}


// let lastRenderTime1 = 0;
// const TANK_SPEED = 1;
//
// function gameStep(currentTime) {
//   window.requestAnimationFrame(gameStep);
//   const secondsSinceLastRender = (currentTime - lastRenderTime1) / 1000;
//   if (secondsSinceLastRender < 1 / TANK_SPEED) return
//   lastRenderTime1 = currentTime;
//   const map = new Map();
//   map.update()
// }
// window.requestAnimationFrame(gameStep);


