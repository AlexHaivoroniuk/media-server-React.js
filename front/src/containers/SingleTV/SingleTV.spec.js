import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import SingleTV from './SingleTV';

const mockStore = configureMockStore([thunk]);
const mockAxios = new AxiosMockAdapter(axios);

const match = { params: { id: 2 } };
mockAxios.onGet('http://localhost:4000/tvs/2').reply(200);

const tv = {
  _id: '5b7582126a59583da21ae120',
  Title: 'True detective',
  Year: { First: '2014', Last: '2018' },
  Genre: 'Drama, Detective, Thriller',
  Country: 'USA',
  NumberOf: {
    Seasons: '3',
    Episodes: '15'
  },
  Seasons: []
};
const notEmptyState = {
  currentTV: {
    tv: tv
  }
};
const emptyState = {
  currentTV: {
    tv: null
  }
};

function mountComponent(state) {
  const store = mockStore(state);
  const wrapper = mount(
    <Router>
      <SingleTV match={match} store={store} />
    </Router>
  );
  return { wrapper, store };
}

describe('<SingleTV />', () => {
  it('should be defined', () => {
    expect(SingleTV).toBeDefined();
  });

  it('should render correctly', () => {
    const { wrapper } = mountComponent(notEmptyState);
    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    it('in general case', () => {
      const { wrapper } = mountComponent(notEmptyState);

      expect(wrapper.find('SingleTV').length).toEqual(1);
    });
    it('when tv is present', () => {
      const { wrapper } = mountComponent(notEmptyState);

      expect(wrapper.find('SingleTV').find('TV').length).toEqual(1);
      expect(
        wrapper
          .find('SingleTV')
          .find('TV')
          .prop('tv')
      ).toEqual(tv);
      expect(wrapper.find('SingleTV').find('Spinner').length).toEqual(0);
    });
    it('when tv is empty', () => {
      const { wrapper } = mountComponent(emptyState);

      expect(wrapper.find('SingleTV').find('TV').length).toEqual(0);
      expect(wrapper.find('SingleTV').find('Spinner').length).toEqual(1);
    });
  });
  it('should have movie prop', () => {
    let store = mockStore(notEmptyState);
    const wrapper = shallow(<SingleTV store={store} />, false);
    expect(wrapper.props().tv).toBeDefined();
    expect(wrapper.props().tv).toEqual(tv);
  });
  it('should fetch() single movie on componentDidMount()', () => {
    let store = mockStore(notEmptyState);
    const spy = jest.spyOn(SingleTV.prototype, 'componentDidMount');
    const wrapper = shallow(<SingleTV store={store} />, false);
    expect(spy).toHaveBeenCalled();
  });
});
