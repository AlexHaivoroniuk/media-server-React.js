import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './filters';

const mockStore = configureMockStore([thunk]);

const initialState = {
  genre: [],
  country: [],
  year: {
    minY: 1900,
    maxY: 2018
  },
  toggleFilters: false
};

describe('action filters', () => {
  let action, store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should create TOGGLE_FILTERS_PANEL', () => {
    store.dispatch(actions.toggleFiltersPanel());
    action = store.getActions();
    expect(action).toEqual([{ type: 'TOGGLE_FILTERS_PANEL' }]);
  });

  it('should create CLEAR_FILTERS and RESET_MOVIES', () => {
    store.dispatch(actions.clearFilters(1));
    action = store.getActions();
    expect(action).toEqual([
      { type: 'CLEAR_FILTERS' },
      { type: 'RESET_MOVIES' }
    ]);
  });

  it('should create HANDLE_FILTERS_INPUT', () => {
    store.dispatch(actions.handleFiltersInput('tvalue', 'tfilter'));
    action = store.getActions();
    expect(action).toEqual([
      {
        type: 'HANDLE_FILTERS_INPUT',
        value: 'tvalue',
        filter: 'tfilter'
      }
    ]);
  });

  it('should create HANDLE_RANGE_INPUT', () => {
    store.dispatch(actions.handleRangeInput('tvalue', 'tyear'));
    action = store.getActions();
    expect(action).toEqual([
      {
        type: 'HANDLE_RANGE_INPUT',
        val: 'tvalue',
        year: 'tyear'
      }
    ]);
  });
});
