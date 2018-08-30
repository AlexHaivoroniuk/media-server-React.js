import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import * as actions from './filterData';

const mockStore = configureMockStore([thunk]);
var mockAxios = new AxiosMockAdapter(axios);

const initialState = {
  genres: [],
  countries: []
};

const fetchURL = 'http://localhost:4000/filters';
const actionStart = { type: 'FETCH_FILTER_DATA_START' };
const actionSuccess = {
  filterData: {
    countries: ['UK', 'USA'],
    genres: ['Action', 'Comedy', 'Thriller']
  },
  type: 'FETCH_FILTER_DATA_SUCCESS'
};
const actionFailure = {
  error: new Error('Request failed with status code 500'),
  type: 'FETCH_FILTER_DATA_FAILURE'
};

describe('action filters', () => {
  let action, store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('fetchFilterData - begin', () => {
    mockAxios.onGet(fetchURL).reply(200, {
      genres: ['Action', 'Comedy', 'Thriller'],
      countries: ['UK', 'USA']
    });
    store.dispatch(actions.fetchFilterData());
    action = store.getActions();
    expect(action).toEqual([actionStart]);
  });

  it('fetchFilterData - success', () => {
    mockAxios.onGet(fetchURL).reply(200, {
      genres: ['Action', 'Comedy', 'Thriller'],
      countries: ['UK', 'USA']
    });
    return store.dispatch(actions.fetchFilterData()).then(() => {
      action = store.getActions();
      expect(action).toEqual([actionStart, actionSuccess]);
    });
  });

  it('fetchFilerData - failure', () => {
    mockAxios.onGet(fetchURL).reply(500);
    return store.dispatch(actions.fetchFilterData()).then(() => {
      action = store.getActions();
      expect(action).toEqual([actionStart, actionFailure]);
    });
  });
});
