import { combineReducers } from 'redux';
import { movies } from './movies';
import { notify } from './notify';
import filters from './filters';
import currentMovie from './currentMovie';
import currentTV from './currentTV';
import filterData from './filterData';
import libraries from './libraries';
import user from './user';
import setupUsers from './setupUsers';
import reducer from './index';

jest.mock('redux', () => ({ combineReducers: jest.fn() }));

describe('combined (index) reducer ', () => {
  afterEach(() => {
    combineReducers.mockRestore();
  });

  it('should have correct structure', () => {
    const expectedReducers = {
      movies,
      filters,
      notify,
      currentMovie,
      currentTV,
      filterData,
      libraries,
      user,
      setupUsers
    };

    expect(combineReducers.mock.calls[0][0]).toEqual(expectedReducers);
  });
});
