import actions from './../actions/actions';

export const movies = (state = {}, action) => {
  switch (action.type) {
    case actions.FETCH_MOVIES_START:
      return { ...state };

    default:
      return state;
  }
};

export default { movies };
