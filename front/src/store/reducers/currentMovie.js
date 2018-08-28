import actions from '../actionsTypes';

export const currentMovie = (state = {}, action) => {
  switch (action.type) {
    case actions.FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        movie: action.movie
      };
    default:
      return state;
  }
};

export default currentMovie;
