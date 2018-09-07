import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import SideNav from './SideNav';

const mockStore = configureMockStore([thunk]);

const sideNavState = {
  user: {
    id: '5b8e87953d843c24a101ce6b',
    name: 'm1',
    role: 'Admin',
    isLoading: false
  }
  // logout: jest.fn()
};

describe('<SideNav />', () => {
  let store, wrapper, toggle, logout;

  beforeEach(() => {
    store = mockStore({
      ...sideNavState
    });
    toggle = jest.fn();
    logout = jest.fn();
    wrapper = mount(
      <MemoryRouter>
        <SideNav store={store} toggle={toggle} logout={logout} />
      </MemoryRouter>
    );
  });

  it('should be defined', () => {
    expect(SideNav).toBeDefined();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have SideNav__Backdrop', () => {
    expect(wrapper.find('.SideNav__Backdrop').length).toEqual(1);
  });

  it('should have correct structure', () => {
    expect(wrapper.find('.SideNav').length).toEqual(1);
  });

  it('should have items', () => {
    const items = ['Home', 'Protected', 'Settings', 'Logout'];
    expect(wrapper.find('.SideNav').find('.SideNav__item').length).toEqual(4);
    items.forEach((el, i) => {
      expect(
        wrapper
          .find('.SideNav__item')
          .at(i)
          .text()
      ).toEqual(el);
    });
  });

  it('should handle toggle() on SideNav__BackDrop', () => {
    const backDrop = wrapper.find('.SideNav__Backdrop');
    backDrop.simulate('click');
    expect(toggle).toHaveBeenCalled();
  });
  it('should handle logout()', () => {
    wrapper
      .find('.SideNav__item')
      .last()
      .instance().onClick = logout;
    wrapper.update();
    wrapper
      .find('.SideNav__item')
      .last()
      .simulate('click');
    logout();
    expect(logout).toHaveBeenCalled();
  });
});
