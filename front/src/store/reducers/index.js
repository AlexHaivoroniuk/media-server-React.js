import { combineReducers } from 'redux';
import { movies } from './movies';
import filters from './filters';

export default combineReducers({
  movies,
  filters
});
