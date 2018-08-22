import { combineReducers } from 'redux';
import { movies } from './movies';
import filters from './filters';
import currentMovie from './currentMovie';

export default combineReducers({
  movies,
  filters,
  currentMovie
});
