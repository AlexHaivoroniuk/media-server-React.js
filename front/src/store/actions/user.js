import actions from '../actionsTypes';
import axios from 'axios';

export const login = () => dispatch => {
  dispatch({
    type: actions.USER_LOGGING_IN
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: actions.USER_LOGGED_OUT
  });
};

const userLoginSuccess = data => ({
  type: actions.USER_LOGGED_IN,
  payload: data
});

export const userLogin = data => (dispatch, getState) => {
  return axios
    .post(`http://localhost:4000/login`, {
      username: data.username,
      password: data.password
    })
    .then(res => res.data)
    .then(data => {
      dispatch(userLoginSuccess(data));
    })
    .catch(() => {
      dispatch(logout());
    });
};
