import { combineReducers } from 'redux';
import { movies } from './movies';
import filters from './filters';
import currentMovie from './currentMovie';
import filterData from './filterData';

export default combineReducers({
  movies,
  filters,
  currentMovie,
  filterData
});
