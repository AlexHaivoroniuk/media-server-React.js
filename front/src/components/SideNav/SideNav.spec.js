import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import SideNavContainer from './SideNav';

const mockStore = configureMockStore([thunk]);
const guestState = {
  user: {
    id: '0',
    name: 'guest',
    role: 'Guest',
    isLoading: false
  }
};
const userState = {
  user: {
    id: '1',
    name: 'user',
    role: 'User',
    isLoading: false
  }
};
const adminState = {
  user: {
    id: '2',
    name: 'admin',
    role: 'Admin',
    isLoading: false
  }
};
function mountComponent(state) {
  const store = mockStore(state);
  const wrapper = mount(
    <Router>
      <SideNavContainer store={store} />
    </Router>
  );
  return { wrapper, store };
}

describe('<SideNav />', () => {
  it('should render correctly', () => {
    const { wrapper } = mountComponent(guestState);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const { wrapper } = mountComponent(guestState);
    expect(wrapper.find('.SideNav').length).toEqual(1);
  });

  describe('should have items', () => {
    it('in the general case', () => {
      const items = [
        'You are logged as guest.',
        'Home',
        'Movies',
        'Music',
        'Protected',
        'Setup',
        'Login'
      ];
      const { wrapper } = mountComponent(guestState);
      expect(wrapper.find('.SideNav').find('.SideNav__item').length).toEqual(7);
      items.forEach((el, i) => {
        expect(
          wrapper
            .find('.SideNav__item')
            .at(i)
            .text()
        ).toEqual(el);
      });
    });

    it('when guest user', () => {
      const { wrapper } = mountComponent(guestState);
      const items = wrapper.find('.SideNav').find('.SideNav__item');
      expect(items.at(0).text()).toEqual('You are logged as guest.');
      expect(items.at(6).text()).toEqual('Login');
    });

    it('when user user', () => {
      const { wrapper } = mountComponent(userState);
      const items = wrapper.find('.SideNav').find('.SideNav__item');
      expect(items.at(0).text()).toEqual('You are logged as user.');
      expect(items.at(6).text()).toEqual('Logout');
    });

    it('when admin user', () => {
      const { wrapper } = mountComponent(adminState);
      const items = wrapper.find('.SideNav').find('.SideNav__item');
      expect(items.at(0).text()).toEqual('You are logged as admin.');
      expect(items.at(6).text()).toEqual('Logout');
    });
  });

  describe('should have links', () => {
    it('in the general case', () => {
      const links = ['/', '/protected', '/setup', '/login'];
      const { wrapper } = mountComponent(guestState);
      expect(wrapper.find('.SideNav').find('Link').length).toEqual(4);
      links.forEach((el, i) => {
        expect(
          wrapper
            .find('.SideNav')
            .find('Link')
            .at(i)
            .prop('to')
        ).toEqual(el);
      });
    });

    it('when guest user', () => {
      const { wrapper } = mountComponent(guestState);
      const links = wrapper.find('.SideNav').find('Link');
      expect(links.at(3).prop('to')).toEqual('/login');
    });

    it('when user user', () => {
      const { wrapper } = mountComponent(userState);
      expect(wrapper.find('.SideNav').find('Link').length).toEqual(3);
    });

    it('when admin user', () => {
      const { wrapper } = mountComponent(adminState);
      expect(wrapper.find('.SideNav').find('Link').length).toEqual(3);
    });
  });

  describe('should do logout', () => {
    it('when user user', () => {
      const { wrapper, store } = mountComponent(userState);
      const items = wrapper.find('.SideNav').find('.SideNav__item');
      items.at(6).simulate('click');
      let action = store.getActions();
      expect(action).toEqual([{ type: 'USER_LOGGED_OUT' }]);
    });

    it('when admin user', () => {
      const { wrapper, store } = mountComponent(adminState);
      const items = wrapper.find('.SideNav').find('.SideNav__item');
      items.at(6).simulate('click');
      let action = store.getActions();
      expect(action).toEqual([{ type: 'USER_LOGGED_OUT' }]);
    });
  });
});
