import actions from './actions';

const fetchMovieStart = data => ({
  type: actions.FETCH_MOVIES_START,
  data
});
const fetchMovieSuccess = movies => ({
  type: actions.FETCH_MOVIES_SUCCESS,
  movies
});
const fetchMovieFailure = data => ({
  type: actions.FETCH_MOVIES_FAILURE,
  data
});

export const fetchMovies = data => (dispatch, getState) => {
  dispatch(fetchMovieStart);
};
