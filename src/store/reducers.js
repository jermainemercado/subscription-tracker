/*
 * combines all th existing reducers
 */

import { combineReducers } from 'redux';

const appReducer = combineReducers({

  // but its referenced here
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
