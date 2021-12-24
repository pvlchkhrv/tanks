import {MAP, MAP_LEGEND} from "./map1.js";
import {Wall} from "./Wall.js";
import {PlayerTank} from "./PlayerTank.js";
import {EnemyTank} from "./EnemyTank.js";
import {store} from './redux/store.js';
import {Map} from './Map.js';
var GAME_TIMER_INTERVAL = 1000; // задаёт интервал времени, за который будет выполняться один шаг в игре
var PLAYER_LIFE_COUNT = 3;
var ENEMY_TANKS_COUNT = 21;
var IS_GAME_OVER = false;


/**
 * в этой функции можно выполнить весь тот код, который необходим для старта игры
 * например, именно в этом месте можно нарисовать блоки стен на карте и подписаться на события нажатия кнопок управления
 */
gameInitialization();


/**
 * Жизненный цикл игры
 * вызывает функцию gameLoop каждые GAME_TIMER_INTERVAL до тех пор, пока игра не закончится
 * (чтобы закончить игру, установите занчение переменной IS_GAME_OVER в true)
 */
gameLoop();


function gameInitialization() {
  const map = new Map();
  map.init();
  console.log(store.getState());

  // for (let i = 0; i < MAP.length; i++) {
  //   const Y = i * 64;
  //   console.log('Y: ', Y);
  //   for (let j = 0; j < MAP[i].length; j++) {
  //     const X = j * 64;
  //     console.log('X: ', X);
  //     if (MAP[i][j] === MAP_LEGEND.WALL) {
  //       const wall = new Wall({top: Y, left: X});
  //       wall.render();
  //     }
  //   }
  // }

  // const calculatePosition = (xIndex, yIndex) => {
  //   return {
  //     top: (xIndex * 64) + 'px',
  //     left: (yIndex * 64) + 'px',
  //   }
  // };
  //
  // MAP.forEach((x, xIndex) => x.forEach((y, yIndex) => {
  //   switch (y) {
  //     case MAP_LEGEND.WALL:
  //       const wall = new Wall(calculatePosition(xIndex, yIndex));
  //       console.log(wall)
  //       wall.render();
  //       break;
  //     // case MAP_LEGEND.PLAYER_BASE:
  //     //   const playerTank = new PlayerTank(calculatePosition(xIndex, yIndex));
  //     //   map.append(playerTank.instance);
  //     //   break;
  //     // case  MAP_LEGEND.ENEMY_BASE:
  //     //   const enemyTank = new EnemyTank(calculatePosition(xIndex, yIndex));
  //     //   enemyTank.id = ENEMY_TANKS_COUNT;
  //     //   enemyTank.style.transform = 'rotate(180deg)';
  //     //   map.append(enemyTank.instance);
  //     //   break;
  //     default:
  //       return;
  //   }
  // }));
  // document.addEventListener('keydown', (e) => {
  //   const playerTank = document.querySelector('.game-object__player-tank');
  //   switch (e.code) {
  //     case 'ArrowUp':
  //       playerTank.style.top = `${parseInt(playerTank.style.top) - 10}px`;
  //       playerTank.style.transform = 'rotate(0deg)'
  //       break;
  //     case 'ArrowDown':
  //       playerTank.style.top = `${parseInt(playerTank.style.top) + 10}px`;
  //       playerTank.style.transform = 'rotate(180deg)'
  //       break;
  //     case 'ArrowRight':
  //       playerTank.style.left = `${parseInt(playerTank.style.left) + 10}px`;
  //       playerTank.style.transform = 'rotate(90deg)'
  //       break;
  //     case 'ArrowLeft':
  //       playerTank.style.left = `${parseInt(playerTank.style.left) - 10}px`;
  //       playerTank.style.transform = 'rotate(-90deg)'
  //       break;
  //     case 'Space':
  //       console.log(e.code);
  //       break;
  //     default:
  //       return;
  //   }
  // });
}

function gameLoop() {
  if (IS_GAME_OVER !== true) {

    /**
     * вот именно в функции gameStep стоит разместить код, который будет выполняться на каждом шаге игрового цикла
     */
    gameStep();


    setTimeout(function () {
      gameLoop()
    }, GAME_TIMER_INTERVAL);
  }
}

function gameStep() {
  const map = new Map();
  map.update();
  // console.log(store.getState());
  /**
   * это то самое место, где стоит делать основные шаги игрового цикла
   * например, как нам кажется, можно было бы сделать следующее
   * 1. передвинуть пули
   * 2. рассчитать, где танки окажутся после этого шага
   * 3. проверить столкновения (пуль с танками, пуль со стенами, танков со стенами и танков с танками)
   * 4. убрать с поля мертвые танки и разрушенные стены
   * 5. проверить, не закончились ли жизни у игрока или не закончиличь ли танки противника
   * 6. создать новые танки на базах в случае, если кого-то убили на этом шаге
   */

}

