import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ControlsContainer, { Controls } from './Controls';

const mockStore = configureMockStore([thunk]);
const initialState = {
  movies: [],
  movieDefault: []
};

describe('<Controls />', () => {
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<ControlsContainer store={store} />);
  });

  it('should be defined', () => {
    expect(Controls).toBeDefined();
  });

  it('should render correctly', () => {
    let store = mockStore(initialState);
    const wrapper = mount(<ControlsContainer store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    it('form with fieldsets and buttons', () => {
      expect(wrapper.find('.Controls').length).toEqual(1);
      expect(wrapper.find('.Controls').find('Button').length).toEqual(4);
    });

    it('button "Sync"', () => {
      const bt = wrapper.find('Button').at(0);
      bt.simulate('click');
      let action = store.getActions();
      expect(action).toEqual([{ data: undefined, type: 'FETCH_MOVIES_START' }]);
    });

    it('button "Sort desc"', () => {
      const bt = wrapper.find('Button').at(1);
      bt.simulate('click');
      let action = store.getActions();
      expect(action).toEqual([{ type: 'SORT_ALPHA_DESC' }]);
    });

    it('button "Sort asc"', () => {
      const bt = wrapper.find('Button').at(2);
      bt.simulate('click');
      let action = store.getActions();
      expect(action).toEqual([{ type: 'SORT_ALPHA_ASC' }]);
    });

    it('button "Toggle filter"', () => {
      const bt = wrapper.find('Button').at(3);
      bt.simulate('click');
      let action = store.getActions();
      expect(action).toEqual([{ type: 'TOGGLE_FILTERS_PANEL' }]);
    });
  });
});
