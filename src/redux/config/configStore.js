import { createStore } from 'redux';
import { combineReducers } from 'redux';
import users from '../modules/users';

// Store
const rootReducer = combineReducers({
  users
});
const store = createStore(rootReducer);
// console.log('스토어 값입니다', store);

export default store;
