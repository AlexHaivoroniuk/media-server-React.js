import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import SingleMovie from './SingleMovie';

const mockStore = configureMockStore([thunk]);
const mockAxios = new AxiosMockAdapter(axios);

const match = { params: { id: 2 } };
mockAxios.onGet('http://localhost:4000/movies/2').reply(200);

const movie = {
  _id: '5b7582126a59583da21ae120',
  Title: 'Gladiator',
  Year: '2000',
  Genre: 'Action, Adventure, Drama',
  Country: 'USA, UK'
};
const notEmptyState = {
  currentMovie: {
    movie: movie
  }
};
const emptyState = {
  currentMovie: {
    movie: null
  }
};

function mountComponent(state) {
  const store = mockStore(state);
  const wrapper = mount(
    <Router>
      <SingleMovie match={match} store={store} />
    </Router>
  );
  return { wrapper, store };
}

describe('<SingleMovie />', () => {
  it('should be defined', () => {
    expect(SingleMovie).toBeDefined();
  });

  it('should render correctly', () => {
    const { wrapper } = mountComponent(notEmptyState);
    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    it('in general case', () => {
      const { wrapper } = mountComponent(notEmptyState);

      expect(wrapper.find('SingleMovie').length).toEqual(1);
    });
    it('when movie is present', () => {
      const { wrapper } = mountComponent(notEmptyState);

      expect(wrapper.find('SingleMovie').find('Movie').length).toEqual(1);
      expect(
        wrapper
          .find('SingleMovie')
          .find('Movie')
          .prop('movie')
      ).toEqual(movie);
      expect(wrapper.find('SingleMovie').find('Spinner').length).toEqual(0);
    });
    it('when movie is empty', () => {
      const { wrapper } = mountComponent(emptyState);

      expect(wrapper.find('SingleMovie').find('Movie').length).toEqual(0);
      expect(wrapper.find('SingleMovie').find('Spinner').length).toEqual(1);
    });
  });
  it('should have movie prop', () => {
    let store = mockStore(notEmptyState);
    const wrapper = shallow(<SingleMovie store={store} />, false);
    expect(wrapper.props().movie).toBeDefined();
    expect(wrapper.props().movie).toEqual(movie);
  });
  it('should fetch() single movie on componentDidMount()', () => {
    let store = mockStore(notEmptyState);
    const spy = jest.spyOn(SingleMovie.prototype, 'componentDidMount');
    const wrapper = shallow(<SingleMovie store={store} />, false);
    expect(spy).toHaveBeenCalled();
  });
});
