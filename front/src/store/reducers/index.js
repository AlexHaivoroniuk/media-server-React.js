import { combineReducers } from 'redux';
import { movies } from './movies';
import { notify } from './notify';
import libraries from './libraries';
import filters from './filters';
import currentMovie from './currentMovie';
import filterData from './filterData';
import user from './user';

export default combineReducers({
  movies,
  filters,
  notify,
  currentMovie,
  filterData,
  user,
  libraries
});
