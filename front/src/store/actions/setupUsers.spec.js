import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import * as actions from './setupUsers';

const mockStore = configureMockStore([thunk]);
var mockAxios = new AxiosMockAdapter(axios);

const user1 = {
  username: 'admin',
  password: '$2b$10$jq.dVFAomuK1wDKCV.gYhuRPbvygVkh3l74EoYNANmWqfpJJQSKmW',
  role: 'Admin',
  id: '5b98'
};
const user2 = {
  username: 'user',
  password: '$2b$10$XSGk64HMpNrB/lBEVtdVyuiaZKYtOViSLIlIjCW/6M5qXQnomN9hm',
  role: 'User',
  id: 'cb1b'
};

const users = [user1, user2];
const initialState = users.map(user => ({ ...user, editing: false }));

describe('action setupUsers', () => {
  let action, store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  describe('userFetch', () => {
    it('should create USER_FETCH_SUCCESS', () => {
      const data = [...users];
      mockAxios.onGet(`http://localhost:4000/users`).reply(200, data);
      return store.dispatch(actions.userFetch()).then(() => {
        action = store.getActions();
        expect(action).toEqual([
          {
            type: 'USER_FETCH_SUCCESS',
            users: users.map(user => ({ ...user, editing: false }))
          }
        ]);
      });
    });

    it('should create USER_FETCH_FAILURE', () => {
      mockAxios.onGet(`http://localhost:4000/users`).reply(500, 'Error');
      return store.dispatch(actions.userFetch()).then(() => {
        action = store.getActions();
        expect(action).toEqual([
          {
            type: 'USER_FETCH_FAILURE',
            e: new Error('Request failed with status code 500')
          }
        ]);
      });
    });
  });

  describe('userCreate', () => {
    it('should create USER_CREATE_SUCCESS', () => {
      const data = {
        username: 'abc',
        password: 'gfhjkm',
        role: 'Manager'
      };
      mockAxios.onPost(`http://localhost:4000/users`).reply(200, data);
      return store.dispatch(actions.userCreate(data)).then(() => {
        action = store.getActions();
        expect(action).toEqual([
          {
            type: 'USER_CREATE_SUCCESS',
            data
          }
        ]);
      });
    });

    it('should create USER_FAILURE', () => {
      const data = {
        username: 'abc',
        password: 'gfhjkm',
        role: 'Manager'
      };
      mockAxios.onPost(`http://localhost:4000/users`).reply(500, 'Error');
      return store.dispatch(actions.userCreate(data)).then(() => {
        action = store.getActions();
        expect(action).toEqual([
          {
            type: 'USER_FAILURE',
            e: new Error('Request failed with status code 500')
          }
        ]);
      });
    });
  });

  describe('userUpdate', () => {
    it('should create USER_UPDATE_SUCCESS', () => {
      const data = {
        id: user2.id,
        username: 'abc',
        role: 'Manager'
      };
      mockAxios
        .onPut(`http://localhost:4000/users/${user2.id}`)
        .reply(200, data);
      return store.dispatch(actions.userUpdate(data)).then(() => {
        action = store.getActions();
        expect(action).toEqual([
          {
            type: 'USER_UPDATE_SUCCESS',
            data
          }
        ]);
      });
    });

    it('should create USER_FAILURE', () => {
      const data = {
        id: user2.id
      };
      mockAxios
        .onPut(`http://localhost:4000/users/${user2.id}`)
        .reply(500, 'Error');
      return store.dispatch(actions.userUpdate(data)).then(() => {
        action = store.getActions();
        expect(action).toEqual([
          {
            type: 'USER_FAILURE',
            e: new Error('Request failed with status code 500')
          }
        ]);
      });
    });
  });

  describe('userDelete', () => {
    it('should create USER_DELETE_SUCCESS', () => {
      const data = 'User deleted successfully!';
      mockAxios
        .onDelete(`http://localhost:4000/users/${user2.id}`)
        .reply(200, data);
      return store.dispatch(actions.userDelete(user2.id)).then(() => {
        action = store.getActions();
        expect(action).toEqual([
          {
            type: 'USER_DELETE_SUCCESS',
            id: user2.id
          }
        ]);
      });
    });

    it('should create USER_DELETE_FAILURE', () => {
      const data = `Could not delete user with id ${user2.id}`;
      mockAxios
        .onDelete(`http://localhost:4000/users/${user2.id}`)
        .reply(500, data);
      return store.dispatch(actions.userDelete(user2.id)).then(() => {
        action = store.getActions();
        expect(action).toEqual([
          {
            type: 'USER_FAILURE',
            e: new Error('Request failed with status code 500')
          }
        ]);
      });
    });
  });
});
