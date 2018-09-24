import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import SideNavContainer from './SideNav';

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
  let store, wrapper, toggle, logout;

  beforeEach(() => {
    store = mockStore({
      ...sideNavState
    });
    toggle = jest.fn();
    logout = jest.fn();
    wrapper = mount(
      <MemoryRouter>
        <SideNavContainer store={store} toggle={toggle} logout={logout} />
      </MemoryRouter>
    );
  });

  it('should be defined', () => {
    expect(SideNavContainer).toBeDefined();
  });

  it('should render correctly', () => {
    const { wrapper } = mountComponent(guestState);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have SideNav__Backdrop', () => {
    expect(wrapper.find('.SideNav__Backdrop').length).toEqual(1);
  });

  it('should have correct structure', () => {
    const { wrapper } = mountComponent(guestState);
    expect(wrapper.find('.SideNav').length).toEqual(1);
  });

  it('should have items', () => {
    const items = ['Home', 'Protected', 'Settings', 'Logout'];
    expect(
      wrapper.find('.SideNav').find('a.SideNav__item').length +
        wrapper.find('.SideNav').find('div.SideNav__item').length
    ).toEqual(4);
    items.forEach((el, i) => {
      if (i !== 3) {
        expect(
          wrapper
            .find('a.SideNav__item')
            .at(i)
            .text()
        ).toEqual(el);
      } else {
        expect(
          wrapper
            .find('.SideNav__item')
            .last()
            .text()
        ).toEqual(el);
      }
    });
  });

  describe('should have items', () => {
    it('in the general case', () => {
      const items = ['Home', 'Login'];
      const { wrapper } = mountComponent(guestState);
      expect(
        wrapper.find('.SideNav').find('a.SideNav__item').length +
          wrapper.find('.SideNav').find('div.SideNav__item').length
      ).toEqual(2);
      items.forEach((el, i) => {
        if (i !== 1) {
          expect(
            wrapper
              .find('a.SideNav__item')
              .at(i)
              .text()
          ).toEqual(el);
        } else {
          expect(
            wrapper
              .find('.SideNav__item')
              .last()
              .text()
          ).toEqual(el);
        }
      });
    });

    it('when guest user', () => {
      const items = ['Home', 'Login'];
      const { wrapper } = mountComponent(guestState);
      items.forEach((el, i) => {
        if (i !== 1) {
          expect(
            wrapper
              .find('a.SideNav__item')
              .at(i)
              .text()
          ).toEqual(el);
        } else {
          expect(
            wrapper
              .find('.SideNav__item')
              .last()
              .text()
          ).toEqual(el);
        }
      });
    });

    it('when user user', () => {
      const items = ['Home', 'Logout'];
      const { wrapper } = mountComponent(userState);
      items.forEach((el, i) => {
        if (i !== 1) {
          expect(
            wrapper
              .find('a.SideNav__item')
              .at(i)
              .text()
          ).toEqual(el);
        } else {
          expect(
            wrapper
              .find('.SideNav__item')
              .last()
              .text()
          ).toEqual(el);
        }
      });
    });

    it('when admin user', () => {
      const items = ['Home', 'Logout'];
      const { wrapper } = mountComponent(adminState);
      items.forEach((el, i) => {
        if (i !== 1) {
          expect(
            wrapper
              .find('a.SideNav__item')
              .at(i)
              .text()
          ).toEqual(el);
        } else {
          expect(
            wrapper
              .find('.SideNav__item')
              .last()
              .text()
          ).toEqual(el);
        }
      });
    });
  });

  describe('should have links', () => {
    it('in the general case', () => {
      const links = ['/', '/login'];
      const { wrapper } = mountComponent(guestState);
      expect(wrapper.find('.SideNav').find('Link').length).toEqual(2);
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

      expect(links.at(1).prop('to')).toEqual('/login');
    });

    it('when user user', () => {
      const { wrapper } = mountComponent(userState);
      expect(wrapper.find('.SideNav').find('.SideNav__item').length).toEqual(7);
    });

    it('when admin user', () => {
      const { wrapper } = mountComponent(adminState);
      expect(wrapper.find('.SideNav').find('Link').length).toEqual(3);
    });
  });

  describe('should do logout', () => {
    it('when user user', () => {
      const { wrapper, store } = mountComponent(userState);
      const items = wrapper.find('.SideNav').find('div.SideNav__item');
      items.simulate('click');
      let action = store.getActions();
      expect(action).toEqual([{ type: 'USER_LOGGED_OUT' }]);
    });

    it('when admin user', () => {
      const { wrapper, store } = mountComponent(adminState);
      const items = wrapper.find('.SideNav').find('div.SideNav__item');
      items.simulate('click');
      let action = store.getActions();
      expect(action).toEqual([{ type: 'USER_LOGGED_OUT' }]);
    });
  });

  it('should handle toggle() on SideNav__BackDrop', () => {
    const backDrop = wrapper.find('.SideNav__Backdrop');
    backDrop.simulate('click');
    expect(toggle).toHaveBeenCalled();
  });
  it('should handle logout()', () => {
    wrapper
      .find('div.SideNav__item')
      .last()
      .instance().onClick = logout;
    wrapper.update();
    wrapper
      .find('div.SideNav__item')
      .last()
      .simulate('click');
    logout();
    expect(logout).toHaveBeenCalled();
  });
});
