import {reducer} from "./reducer.js";

function createStore(reducer, initialState) {
  let currentReducer = reducer;
  let currentState = initialState;
  let listeners = [];

  return {
    getState() {
      return currentState;
    },
    dispatch(action) {
      currentState = currentReducer(currentState, action);
      listeners.forEach(listener => listener());
      return action;
    },
    subscribe(newListener) {
      listeners.push(newListener);
    }
  }
}

const initialState = {
  lives: 3,
  enemyTanksCount: 21,
  enemyTanks: [],
  walls: [],
  playerTank: null,
  bullets: []
}

export const store = createStore(reducer, initialState);
