import actions from '../actionsTypes';
import axios from 'axios';

const fetchTVSuccess = tv => ({
  type: actions.FETCH_TV_SUCCESS,
  tv
});

export const fetchTV = data => (dispatch, _getState) => {
  axios
    .get(`http://localhost:4000/tvs/${data}`)
    .then(res => res.data)
    .then(data => {
      dispatch(fetchTVSuccess(data));
    });
};
