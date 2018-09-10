import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MoviesContainer from './MoviesContainer';

const mockStore = configureMockStore([thunk]);
const movie1 = {
  _id: '5b7582126a59583da21ae120',
  Title: 'Gladiator',
  Year: '2000',
  Genre: 'Action, Adventure, Drama',
  Country: 'USA, UK'
};
const moviesStateEmpty = {
  movies: {
    movieDefault: []
  }
};
const moviesStateNotEmpty = {
  movies: {
    movies: [movie1, movie1, movie1],
    movieDefault: [movie1, movie1, movie1]
  }
};
const filtersState = {
  filters: {
    year: {
      minY: 1976,
      maxY: 2018
    },
    toggleFilters: true
  }
};

const filterDataState = {
  filterData: {
    genres: [],
    countries: []
  }
};

function mountComponent(state) {
  const store = mockStore(state);
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <MoviesContainer />
      </Router>
    </Provider>
  );
  return { wrapper, store };
}

describe('<MoviesContainer />', () => {
  it('should be defined', () => {
    expect(MoviesContainer).toBeDefined();
  });

  it('should render correctly', () => {
    const { wrapper } = mountComponent({
      ...moviesStateEmpty,
      ...filtersState,
      ...filterDataState
    });

    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    it('in general case', () => {
      const { wrapper } = mountComponent({
        ...moviesStateEmpty,
        ...filtersState,
        ...filterDataState
      });

      expect(wrapper.find('MoviesContainer').length).toEqual(1);
      expect(
        wrapper.find('MoviesContainer').find('Connect(Component)').length
      ).toEqual(1);
      expect(
        wrapper.find('MoviesContainer').find('Connect(Filters)').length
      ).toEqual(1);
    });

    it('when movies is empty', () => {
      const { wrapper } = mountComponent({
        ...moviesStateEmpty,
        ...filtersState,
        ...filterDataState
      });

      expect(wrapper.find('MoviesContainer').find('Spinner').length).toEqual(1);
      expect(wrapper.find('MoviesContainer').find('.Movies').length).toEqual(0);
      expect(wrapper.find('MoviesContainer').find('Card').length).toEqual(0);
    });

    it('when movies is not empty', () => {
      const { wrapper } = mountComponent({
        ...moviesStateNotEmpty,
        ...filtersState,
        ...filterDataState
      });

      expect(wrapper.find('MoviesContainer').find('Spinner').length).toEqual(0);
      expect(wrapper.find('MoviesContainer').find('.Movies').length).toEqual(1);
      expect(wrapper.find('.Movies').find('Card').length).toEqual(3);
    });
  });
});
