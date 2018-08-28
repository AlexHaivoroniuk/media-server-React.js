import actions from '../actionsTypes';
import axios from 'axios';

const fetchFilterDataStart = () => ({
  type: actions.FETCH_FILTER_DATA_START
});
const fetchFilterDataSuccess = data => ({
  type: actions.FETCH_FILTER_DATA_SUCCESS,
  filterData: data
});
const fetchFilterDataFailure = err => ({
  type: actions.FETCH_FILTER_DATA_FAILURE,
  error: err
});

export const fetchFilterData = data => (dispatch, getState) => {
  dispatch(fetchFilterDataStart());

  return axios
    .get('http://localhost:4000/filters')
    .then(res => res.data)
    .then(data => {
      dispatch(fetchFilterDataSuccess(data));
      return null;
    })
    .catch(err => dispatch(fetchFilterDataFailure(err)));
};
