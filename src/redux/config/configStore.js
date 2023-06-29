import { createStore } from 'redux';
import { combineReducers } from 'redux';
import users from '../modules/users';

// Store
const rootReducer = combineReducers({
  users
});
const store = createStore(rootReducer);

export default store;
