import actions from '../actionsTypes';
import axios from 'axios';

export const fetchLibraries = () => (dispatch, getStore) => {
  axios
    .get('http://localhost:4000/libraries')
    .then(res => {
      dispatch({ type: actions.FETCH_LIBRARIES, data: res.data });
    })
    .catch(console.log);
};
