import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import * as actions from './user';

const mockStore = configureMockStore([thunk]);
var mockAxios = new AxiosMockAdapter(axios);

const initialState = {
  id: '0',
  name: 'guest',
  role: 'Guest',
  isLoading: false
};

describe('action user', () => {
  let action, store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should create USER_LOGGING_IN', () => {
    store.dispatch(actions.login());
    action = store.getActions();
    expect(action).toEqual([
      {
        type: 'USER_LOGGING_IN'
      }
    ]);
  });

  it('should create USER_LOGGED_OUT', () => {
    store.dispatch(actions.logout());
    action = store.getActions();
    expect(action).toEqual([
      {
        type: 'USER_LOGGED_OUT'
      }
    ]);
  });

  describe('userLogin()', () => {
    it('when success', () => {
      const data = {
        id: '321',
        username: 'Richard Matthew Stallman',
        role: 'God'
      };
      mockAxios.onPost('http://localhost:4000/login').reply(200, data);
      return store
        .dispatch(
          actions.userLogin({
            username: 'RMS',
            password: 'GNU'
          })
        )
        .then(() => {
          action = store.getActions();
          expect(action).toEqual([
            {
              type: 'USER_LOGGED_IN',
              payload: data
            }
          ]);
        });
    });

    it('when failure', () => {
      mockAxios.onPost('http://localhost:4000/login').reply(401);
      return store
        .dispatch(
          actions.userLogin({
            username: 'RMS',
            password: 'GNU'
          })
        )
        .then(() => {
          action = store.getActions();
          expect(action).toEqual([
            {
              type: 'USER_LOGGED_OUT'
            }
          ]);
        });
    });
  });
});
