import actions from '../actionsTypes';
import axios from 'axios';

const fetchMovieStart = data => ({
  type: actions.FETCH_MOVIES_START,
  data
});
const fetchMovieSuccess = movies => ({
  type: actions.FETCH_MOVIES_SUCCESS,
  movies
});
const fetchMovieFailure = (data, e) => ({
  type: actions.FETCH_MOVIES_FAILURE,
  data,
  error: e
});

export const filterMovies = data => (dispatch, getState) => {
  const filters = getState().filters;
  dispatch({ type: actions.FILTER_MOVIES, filters });
};

export const fetchMovies = data => (dispatch, getState) => {
  dispatch(fetchMovieStart());

  return axios
    .get('http://localhost:4000/movies')
    .then(res => res.data)
    .then(data => {
      dispatch(fetchMovieSuccess(data));
      return null;
    })
    .catch(err => dispatch(fetchMovieFailure(err.message, err)));
};
