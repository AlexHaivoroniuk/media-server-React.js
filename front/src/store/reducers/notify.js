import actions from '../actionsTypes';

export const notify = (state = [], action) => {
  // console.log('Notify reducer:', action);
  switch (action.type) {
    case actions.NOTIFY_STREAM_MESSAGE:
      return [{ ...action.data, id: action.id }, ...state];
    case actions.REMOVE_NOTIF_BY_ID:
      return [...state.filter(item => item.id !== action.id)];
    default:
      return state;
  }
};

export default { notify };
