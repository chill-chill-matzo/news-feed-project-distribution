import { createStore } from 'redux';
import { combineReducers } from 'redux';
import users from '../modules/users';
import post from '../modules/post';

const rootReducer = combineReducers({
  users,
  post
});
const store = createStore(rootReducer);

export default store;
