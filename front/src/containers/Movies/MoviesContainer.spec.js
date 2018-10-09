import React from 'react';
import { shallow, mount } from 'enzyme';
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
const movie2 = {
  _id: '5b7582126a5951ae83d120a2',
  Title: 'Gladiator',
  Year: '2000',
  Genre: 'Action, Adventure, Drama',
  Country: 'USA, UK',
  Type: 'movie'
};
const tv = {
  Poster: 'posterTV.img',
  Title: 'Malesuada pellentesque',
  OriginalTitle: 'Excepteur sint',
  Runtime: '50, 60 min',
  Plot:
    'Facilisis mauris sit amet massa vitae tortor condimentum. Egestas sed tempus urna et pharetra pharetra.',
  Year: {
    First: '2000',
    Last: '2002'
  },
  Genre: 'Lacus, Vestibulum',
  Director: 'Tincidunt Eget',
  Country: 'Odio',
  Actors: 'Ipsum Ullamcorper, Nunc Aliquet, Viverra Tellus',
  NumberOf: {
    Seasons: '2',
    Episodes: '16'
  },
  //Seasons: [],
  Type: 'tv',
  _id: '5b7582126a5951a3d1e80a22'
};
const moviesStateEmpty = {
  movies: {
    movieDefault: []
  }
};
const moviesStateMixed = {
  movies: {
    movies: [movie1, movie2, tv],
    movieDefault: [movie1, movie2, tv]
  }
};
const moviesStateMovie = {
  movies: {
    movies: [movie1, movie2],
    movieDefault: [movie1, movie2]
  }
};
const moviesStateTV = {
  movies: {
    movies: [tv, tv, tv, tv],
    movieDefault: [tv, tv, tv, tv]
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

    it('when movies have movie type only', () => {
      const { wrapper } = mountComponent({
        ...moviesStateMovie,
        ...filtersState,
        ...filterDataState
      });

      expect(wrapper.find('MoviesContainer').find('Spinner').length).toEqual(0);
      expect(wrapper.find('MoviesContainer').find('.Movies').length).toEqual(1);
      expect(wrapper.find('.Movies').find('CardMovie').length).toEqual(2);
    });

    it('when movies have tv type only', () => {
      const { wrapper } = mountComponent({
        ...moviesStateTV,
        ...filtersState,
        ...filterDataState
      });

      expect(wrapper.find('MoviesContainer').find('Spinner').length).toEqual(0);
      expect(wrapper.find('MoviesContainer').find('.Movies').length).toEqual(1);
      expect(wrapper.find('.Movies').find('CardTV').length).toEqual(4);
    });

    it('when movies are both movie and tv type', () => {
      const { wrapper } = mountComponent({
        ...moviesStateMixed,
        ...filtersState,
        ...filterDataState
      });

      expect(wrapper.find('MoviesContainer').find('Spinner').length).toEqual(0);
      expect(wrapper.find('MoviesContainer').find('.Movies').length).toEqual(1);
      expect(wrapper.find('.Movies').find('CardMovie').length).toEqual(2);
      expect(wrapper.find('.Movies').find('CardTV').length).toEqual(1);
    });

    it('when movies is empty', () => {
      const { wrapper } = mountComponent({
        ...moviesStateEmpty,
        ...filtersState,
        ...filterDataState
      });

      expect(wrapper.find('MoviesContainer').find('Spinner').length).toEqual(1);
      expect(wrapper.find('MoviesContainer').find('.Movies').length).toEqual(0);
      expect(wrapper.find('MoviesContainer').find('CardMovie').length).toEqual(
        0
      );
      expect(wrapper.find('MoviesContainer').find('CardTV').length).toEqual(0);
    });
  });
});
