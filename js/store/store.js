import {reducer} from './reducer.js';
import {INITIAL_STATE} from '../constants.js';

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

export const store = createStore(reducer, INITIAL_STATE);
