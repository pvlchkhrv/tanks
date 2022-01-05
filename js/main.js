import {store} from './store/store.js';
import {Map} from './map/Map.js';
import {GAME_TIMER_INTERVAL, IS_GAME_OVER} from './constants.js';

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


