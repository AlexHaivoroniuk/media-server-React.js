import { combineReducers } from 'redux';
import { movies } from './movies';
import { notify } from './notify';
import filters from './filters';

export default combineReducers({
  movies,
  filters,
  notify
});
