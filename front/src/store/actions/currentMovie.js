import actions from '../actionsTypes';
import axios from 'axios';

const fetchMovieSuccess = movie => ({
  type: actions.FETCH_MOVIE_SUCCESS,
  movie
});

export const fetchMovie = data => (dispatch, _getState) => {
  axios
    .get(`http://localhost:4000/movies/${data}`)
    .then(res => res.data)
    .then(data => {
      dispatch(fetchMovieSuccess(data));
    });
};
