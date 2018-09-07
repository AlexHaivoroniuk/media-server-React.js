import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MoviesContainer from './MoviesContainer';

const mockStore = configureMockStore([thunk]);

const initialState = {
  movies: {
    movies: [],
    moviesDefault: []
  },
  fetch: jest.fn(),
  filters: {
    genre: [],
    country: [],
    year: {
      minY: 1900,
      maxY: 2018
    },
    toggleFilters: false
  },
  filterData: {
    genres: [
      'Action',
      'Adventure',
      'Biography',
      'Comedy',
      'Crime',
      'Drama',
      'Fantasy',
      'Horror',
      'Romance',
      'Sci-Fi',
      'Thriller'
    ],
    countries: ['Canada', 'France', 'New Zealand', 'UK', 'USA']
  }
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

  it('should have props', () => {
    let store = mockStore(initialState);
    const wrapper = shallow(<MoviesContainer store={store} />);
    expect(wrapper.props().movies.length).toEqual(0);
    expect(wrapper.props().moviesDefault.length).toEqual(0);
    expect(wrapper.props().fetch).toBeDefined();
  });
  it('should fetch() movies', () => {
    const spy = jest.spyOn(MoviesContainer.prototype, 'componentDidMount');
    let store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <MoviesContainer />
      </Provider>
    );
    wrapper
      .find('MoviesContainer')
      .instance()
      .componentDidMount();
    expect(spy).toHaveBeenCalled();
  });
});
