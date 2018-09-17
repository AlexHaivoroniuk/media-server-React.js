import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Toolbar from './Toolbar';

const mockStore = configureMockStore([thunk]);

const toolbarState = {
  user: {
    id: '5b8e87953d843c24a101ce6b',
    name: 'm1',
    role: 'Admin',
    isLoading: false
  },
  logout: jest.fn()
};

describe('<Toolbar />', () => {
  let store, wrapper, mockFn;

  beforeEach(() => {
    store = mockStore({
      ...toolbarState
    });
    mockFn = jest.fn();
    wrapper = mount(
      <MemoryRouter>
        <Toolbar store={store} toggle={mockFn} />
      </MemoryRouter>
    );
  });

  it('should be defined', () => {
    expect(Toolbar).toBeDefined();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    expect(wrapper.find('.Toolbar').length).toEqual(1);
  });
  describe('Menu', () => {
    it('should have Menu', () => {
      expect(wrapper.find('.Toolbar__Menu').length).toEqual(1);
    });
    describe('Menu__Item', () => {
      it('should have Menu__Item', () => {
        expect(wrapper.find('.Toolbar__Menu__item')).toBeDefined();
      });
      it('should have Menu__Status', () => {
        expect(wrapper.find('.Toolbar__Menu__status').length).toEqual(1);
      });
    });
  });

  it('should have Logo', () => {
    expect(wrapper.find('.Toolbar').find('.Logo').length).toEqual(1);
  });

  it('should have Title', () => {
    expect(wrapper.find('a.Toolbar__title').length).toEqual(1);
    expect(wrapper.find('a.Toolbar__title').text()).toMatch(/MediaServer/);
  });

  it('should handle the click event', () => {
    wrapper.find('.Toolbar__sideBarTgl').simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
  it('should handle logout()', () => {
    wrapper
      .find('.Toolbar__Menu__item')
      .last()
      .simulate('click');

    wrapper
      .find('.Toolbar__Menu__item')
      .last()
      .instance().onClick = toolbarState.logout;
    wrapper.update();
    wrapper
      .find('.Toolbar__Menu__item')
      .last()
      .simulate('click');
    toolbarState.logout();
    expect(toolbarState.logout).toHaveBeenCalled();
  });
});
