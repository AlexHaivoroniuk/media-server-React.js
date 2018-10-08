import { combineReducers } from 'redux';
import { movies } from './movies';
import { notify } from './notify';
import libraries from './libraries';
import filters from './filters';
import currentMovie from './currentMovie';
import currentTV from './currentTV';
import filterData from './filterData';
import user from './user';
import setupUsers from './setupUsers';

export default combineReducers({
  movies,
  filters,
  notify,
  currentMovie,
  currentTV,
  filterData,
  user,
  libraries,
  setupUsers
});
