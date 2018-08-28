import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MoviesContainer from './MoviesContainer';

const mockStore = configureMockStore([thunk]);

const initialState = {
  movies: [],
  movieDefault: []
};

describe('<MoviesContainer />', () => {
  it('should be defined', () => {
    expect(MoviesContainer).toBeDefined();
  });

  it('should render correctly', () => {
    let store = mockStore(initialState);
    const wrapper = shallow(<MoviesContainer store={store} />, false);
    expect(wrapper).toMatchSnapshot();
  });
});
