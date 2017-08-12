import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
  SORT_LIST,
} from '../constants/ActionTypes';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function addToList(item) {
  return { type: ADD_TO_LIST, item };
}

export function removeFromList(index) {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: REMOVE_FROM_LIST, index });
    }, 1000);
  }
}

export function sortList() {
  return { type: SORT_LIST};
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, 1000);
  };
}
