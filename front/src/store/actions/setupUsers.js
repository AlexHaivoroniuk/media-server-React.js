import actions from '../actionsTypes';
import axios from 'axios';

const userCreateSuccess = data => ({
  type: actions.USER_CREATE_SUCCESS,
  data
});

const userUpdateSuccess = data => ({
  type: actions.USER_UPDATE_SUCCESS,
  data
});

const userDeleteSuccess = id => ({
  type: actions.USER_DELETE_SUCCESS,
  id
});

const userFetchSuccess = users => ({
  type: actions.USER_FETCH_SUCCESS,
  users
});
const userFetchFailure = e => ({
  type: actions.USER_FETCH_FAILURE,
  e
});
const userFailure = e => ({
  type: actions.USER_FAILURE,
  e
});

export const userFetch = () => (dispatch, getState) => {
  //dispatch(fetchMovieStart());

  return axios
    .get('http://localhost:4000/users')
    .then(res => res.data)
    .then(data => {
      dispatch(
        userFetchSuccess(
          data.map(user => {
            return {
              ...user,
              editing: false
            };
          })
        )
      );
      return null;
    })
    .catch(err => dispatch(userFetchFailure(err)));
};

export const userCreate = data => (dispatch, getState) => {
  return axios
    .post(`http://localhost:4000/users`, {
      username: data.username,
      password: data.password,
      role: data.role
    })
    .then(res => res.data)
    .then(data => {
      dispatch(userCreateSuccess(data));
    })
    .catch(err => dispatch(userFailure(err)));
};

export const userUpdate = data => (dispatch, getState) => {
  return axios
    .put(`http://localhost:4000/users/${data.id}`, {
      username: data.username,
      password: data.password,
      role: data.role
    })
    .then(res => res.data)
    .then(() => {
      dispatch(userUpdateSuccess(data));
    })
    .catch(err => dispatch(userFailure(err)));
};

export const userDelete = id => (dispatch, getState) => {
  return axios
    .delete(`http://localhost:4000/users/${id}`)
    .then(res => res.data)
    .then(() => {
      dispatch(userDeleteSuccess(id));
    })
    .catch(err => dispatch(userFailure(err)));
};
