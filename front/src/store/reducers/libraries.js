import actions from '../actionsTypes';

const libraries = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_LIBRARIES:
      return [...action.data];
    default:
      return state;
  }
};

export default libraries;
