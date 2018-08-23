import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import * as actions from './movies';

const mockStore = configureMockStore([thunk]);
var mockAxios = new AxiosMockAdapter(axios);

const initialState = {
  filters: {
    genre: [],
    country: [],
    year: {
      minY: 1900,
      maxY: 2018
    }
  },
  toggleFilters: false
};

describe('action movies', () => {
  let action, store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should create FILTER_MOVIES', () => {
    store.dispatch(actions.filterMovies());
    action = store.getActions();
    expect(action).toEqual([
      {
        type: 'FILTER_MOVIES',
        filters: {
          genre: [],
          country: [],
          year: {
            minY: 1900,
            maxY: 2018
          }
        }
      }
    ]);
  });

  it('fetchMovies - begin', () => {
    mockAxios.onGet('http://localhost:4000/movies').reply(200, { id: 4 });
    store.dispatch(actions.fetchMovies());
    action = store.getActions();
    expect(action).toEqual([{ type: 'FETCH_MOVIES_START' }]);
  });

  it('fetchMovies - success', () => {
    mockAxios.onGet('http://localhost:4000/movies').reply(200, { id: 4 });
    return store.dispatch(actions.fetchMovies()).then(() => {
      action = store.getActions();
      expect(action).toEqual([
        { type: 'FETCH_MOVIES_START' },
        { movies: { id: 4 }, type: 'FETCH_MOVIES_SUCCESS' }
      ]);
    });
  });

  it('fetchMovies - failure', () => {
    mockAxios.onGet('http://localhost:4000/movies').reply(404);
    return store.dispatch(actions.fetchMovies()).then(() => {
      action = store.getActions();
      expect(action).toEqual([
        { type: 'FETCH_MOVIES_START' },
        {
          e: new Error('Request failed with status code 404'),
          type: 'FETCH_MOVIES_FAILURE'
        }
      ]);
    });
  });
});
