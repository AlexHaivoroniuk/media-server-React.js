import actions from '../actionsTypes';

export const currentTV = (state = {}, action) => {
  switch (action.type) {
    case actions.FETCH_TV_SUCCESS:
      return {
        ...state,
        tv: action.tv
      };
    default:
      return state;
  }
};

export default currentTV;
