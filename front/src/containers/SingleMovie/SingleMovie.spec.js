import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import SingleMovie from './SingleMovie';

const mockStore = configureMockStore([thunk]);
var mockAxios = new AxiosMockAdapter(axios);
const movie = {
  name: 'super movie'
};
const initialState = {
  currentMovie: {
    movie: movie
  }
};

describe('<SingleMovie />', () => {
  it('should be defined', () => {
    expect(SingleMovie).toBeDefined();
  });

  it('should render correctly', () => {
    let store = mockStore(initialState);
    const match = { params: { id: 2 } };
    mockAxios.onGet('http://localhost:4000/movies/2').reply(200, { id: 2 });
    const wrapper = shallow(<SingleMovie match={match} store={store} />, false);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    let store = mockStore(initialState);
    const match = { params: { id: 2 } };
    mockAxios.onGet('http://localhost:4000/movies/2').reply(200, { id: 2 });
    const wrapper = shallow(<SingleMovie match={match} store={store} />, false);
    expect(wrapper.props()).toHaveProperty('movie');
    expect(wrapper.props().movie).toEqual(movie);
  });
  it('should have movie prop', () => {
    let store = mockStore(initialState);
    const wrapper = shallow(<SingleMovie store={store} />, false);
    expect(wrapper.props().movie).toBeDefined();
    expect(wrapper.props().movie).toEqual(movie);
  });
  it('should fetch() single movie on componentDidMount()', () => {
    let store = mockStore(initialState);
    const spy = jest.spyOn(SingleMovie.prototype, 'componentDidMount');
    const wrapper = shallow(<SingleMovie store={store} />, false);
    expect(spy).toHaveBeenCalled();
  });
});
