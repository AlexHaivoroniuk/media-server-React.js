import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import FiltersContainer, { Filters } from './Filters';

const mockStore = configureMockStore([thunk]);
const initialState = {
  movies: {
    movies: [],
    movieDefault: []
  },
  filters: {
    year: {
      minY: 1976,
      maxY: 2018
    },
    toggleFilters: true
  }
};

describe('<Filters />', () => {
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<FiltersContainer store={store} />);
  });

  it('should be defined', () => {
    expect(Filters).toBeDefined();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    it('form with fieldsets and buttons', () => {
      expect(wrapper.find('.Filters').length).toEqual(1);
      expect(wrapper.find('.Filters').find('form').length).toEqual(1);
      expect(wrapper.find('form').find('fieldset').length).toEqual(3);
      expect(wrapper.find('form').find('Button').length).toEqual(2);
    });

    it('fieldset with genres', () => {
      const fs = wrapper
        .find('form')
        .find('fieldset')
        .at(0);
      expect(fs.find('legend').text()).toEqual('Genre');
      expect(fs.find('.Genre').length).toEqual(1);
      expect(fs.find('.Genre').find('Input').length).toEqual(10);
    });

    it('fieldset with countries', () => {
      const fs = wrapper
        .find('form')
        .find('fieldset')
        .at(1);
      expect(fs.find('legend').text()).toEqual('Country');
      expect(fs.find('.Country').length).toEqual(1);
      expect(fs.find('.Country').find('Input').length).toEqual(6);
    });

    it('fieldset with year', () => {
      const fs = wrapper
        .find('form')
        .find('fieldset')
        .at(2);
      expect(fs.find('legend').text()).toEqual('Year');
      expect(fs.find('.Range').length).toEqual(1);
      expect(fs.find('.Range').find('Input').length).toEqual(4);
    });

    it('fieldset with year', () => {
      const fs = wrapper
        .find('form')
        .find('fieldset')
        .at(2);
      expect(fs.find('legend').text()).toEqual('Year');
      expect(fs.find('.Range').length).toEqual(1);
      expect(fs.find('.Range').find('Input').length).toEqual(4);
    });

    it('button "Filter"', () => {
      const bt = wrapper
        .find('form')
        .find('Button')
        .at(0);
      expect(bt.text()).toEqual('Filter');
      bt.simulate('click');
      let action = store.getActions();
      expect(action).toEqual([
        {
          filters: { toggleFilters: true, year: { maxY: 2018, minY: 1976 } },
          type: 'FILTER_MOVIES'
        }
      ]);
    });

    it('button "Clear"', () => {
      const bt = wrapper
        .find('form')
        .find('Button')
        .at(1);
      expect(bt.text()).toEqual('Clear');
      bt.simulate('click');
      let action = store.getActions();
      expect(action).toEqual([
        { type: 'CLEAR_FILTERS' },
        { type: 'RESET_MOVIES' }
      ]);
    });

    it('changing the genre filter', () => {
      const input = wrapper
        .find('form')
        .find('fieldset')
        .at(0)
        .find('Input')
        .at(2)
        .find('input');

      input.simulate('change', {
        target: { checked: true, value: 'GenreName' }
      });
      let action = store.getActions();
      expect(action).toEqual([
        { filter: 'genre', type: 'HANDLE_FILTERS_INPUT', value: 'GenreName' }
      ]);
    });

    it('changing the country filter', () => {
      const input = wrapper
        .find('form')
        .find('fieldset')
        .at(1)
        .find('Input')
        .at(1)
        .find('input');

      input.simulate('change', {
        target: { checked: true, value: 'CountryName' }
      });
      let action = store.getActions();
      expect(action).toEqual([
        {
          filter: 'country',
          type: 'HANDLE_FILTERS_INPUT',
          value: 'CountryName'
        }
      ]);
    });

    it('changing the range filter minY', () => {
      let input = wrapper
        .find('form')
        .find('fieldset')
        .at(2)
        .find('Input')
        .at(0)
        .find('input');

      input.simulate('change', {
        target: { value: '1951' }
      });

      let action = store.getActions();
      expect(action).toEqual([
        {
          type: 'HANDLE_RANGE_INPUT',
          val: '1951',
          year: 'minY'
        }
      ]);
    });

    it('changing the text filter minY', () => {
      let input = wrapper
        .find('form')
        .find('fieldset')
        .at(2)
        .find('Input')
        .at(1)
        .find('input');

      input.simulate('change', {
        target: { value: '1938' }
      });

      let action = store.getActions();
      expect(action).toEqual([
        {
          type: 'HANDLE_RANGE_INPUT',
          val: '1938',
          year: 'minY'
        }
      ]);
    });

    it('changing the range filter maxY', () => {
      let input = wrapper
        .find('form')
        .find('fieldset')
        .at(2)
        .find('Input')
        .at(2)
        .find('input');

      input.simulate('change', {
        target: { value: '1996' }
      });

      let action = store.getActions();
      expect(action).toEqual([
        {
          type: 'HANDLE_RANGE_INPUT',
          val: '1996',
          year: 'maxY'
        }
      ]);
    });

    it('changing the text filter maxY', () => {
      let input = wrapper
        .find('form')
        .find('fieldset')
        .at(2)
        .find('Input')
        .at(3)
        .find('input');

      input.simulate('change', {
        target: { value: '1998' }
      });

      let action = store.getActions();
      expect(action).toEqual([
        {
          type: 'HANDLE_RANGE_INPUT',
          val: '1998',
          year: 'maxY'
        }
      ]);
    });
  });
});
