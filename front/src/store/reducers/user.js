import actions from '../actionsTypes';

const initialState = {
  id: '0',
  name: 'guest',
  role: 'Guest',
  isLoading: false
};

export default function userUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case actions.USER_LOGGING_IN:
      return { ...initialState, isLoading: true };
    case actions.USER_LOGGED_IN:
      return {
        id: payload.id,
        name: payload.username,
        role: payload.role,
        isLoading: false
      };
    case actions.USER_LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}
