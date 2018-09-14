import actions from '../actionsTypes';

const setupUsers = (state = [], action) => {
  switch (action.type) {
    case 'USER_EDIT':
      return state.map(
        user =>
          user.id === action.id ? { ...user, editing: !user.editing } : user
      );
    case actions.USER_FAILURE:
      return [...state];
    case actions.USER_FETCH_START:
      return [...state];
    case actions.USER_FETCH_SUCCESS:
      return [...action.users];
    case actions.USER_FETCH_FAILURE:
      return [...state];
    case actions.USER_CREATE_SUCCESS:
      return state.concat([{ ...action.data, editing: false }]);
    case actions.USER_UPDATE_SUCCESS:
      return state.map(
        user =>
          user.id === action.data.id
            ? {
                ...user,
                username: action.data.username,
                password: action.data.password,
                role: action.data.role,
                editing: !user.editing
              }
            : user
      );
    case actions.USER_DELETE_SUCCESS:
      return state.filter(user => user.id !== action.id);
    default:
      return [...state];
  }
};

export default setupUsers;
