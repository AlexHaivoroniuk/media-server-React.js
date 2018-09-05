import React from 'react';
import { mount } from 'enzyme';
import {
  userIsAuthenticated,
  userIsAuthenticatedRedir,
  userIsNotAuthenticated,
  userIsNotAuthenticatedRedir,
  userIsAdminRedir
} from './auth';
import createBrowserHistory from 'history/createBrowserHistory';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const Admin = () => {
  return <div>Welcome admin.</div>;
};
const User = () => {
  return <div>Welcome user.</div>;
};
const Guest = () => {
  return <div>Welcome guest.</div>;
};

const IsAuthenticated = userIsAuthenticated(User);
const IsAuthenticatedRedir = userIsAuthenticatedRedir(User);
const IsAdminRedir = userIsAdminRedir(Admin);
const IsNotAuthenticated = userIsNotAuthenticated(Guest);
const IsNotAuthenticatedRedir = userIsNotAuthenticatedRedir(Guest);

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
const history = createBrowserHistory();
const location = { pathname: '/' };

describe('auth wrappers', () => {
  describe('userIsAuthenticated', () => {
    it('when user has User role', () => {
      const store = mockStore(userState);
      const wrapper = mount(
        <IsAuthenticated store={store} history={history} />
      );

      expect(wrapper.find('UserIsAuthenticated(User)').length).toEqual(1);
      expect(
        wrapper.find('UserIsAuthenticated(User)').find('User').length
      ).toEqual(1);
      expect(wrapper.find('User').text()).toEqual('Welcome user.');
    });

    it('when user has Guest role', () => {
      const store = mockStore(guestState);
      const wrapper = mount(
        <IsAuthenticated store={store} history={history} />
      );

      expect(wrapper.find('UserIsAuthenticated(User)').length).toEqual(1);
      expect(
        wrapper.find('UserIsAuthenticated(User)').find('User').length
      ).toEqual(0);
      expect(
        wrapper.find('UserIsAuthenticated(User)').find('FailureComponent')
          .length
      ).toEqual(1);
    });
  });

  describe('userIsAuthenticatedRedir', () => {
    it('when user has User role', () => {
      const store = mockStore(userState);
      const wrapper = mount(
        <IsAuthenticatedRedir
          store={store}
          history={history}
          location={location}
        />
      );

      expect(wrapper.find('UserIsAuthenticated(User)').length).toEqual(1);
      expect(
        wrapper.find('UserIsAuthenticated(User)').find('User').length
      ).toEqual(1);
      expect(wrapper.find('User').text()).toEqual('Welcome user.');
    });

    it('when user has Guest role', () => {
      const store = mockStore(guestState);
      const wrapper = mount(
        <IsAuthenticatedRedir
          store={store}
          history={history}
          location={location}
        />
      );

      expect(wrapper.find('UserIsAuthenticated(User)').length).toEqual(1);
      expect(
        wrapper.find('UserIsAuthenticated(User)').find('User').length
      ).toEqual(0);
      expect(
        wrapper.find('UserIsAuthenticated(User)').find('Connect(Redirect)')
          .length
      ).toEqual(1);
      expect(
        wrapper
          .find('UserIsAuthenticated(User)')
          .find('Connect(Redirect)')
          .find('Redirect').length
      ).toEqual(1);
      expect(wrapper.find('Redirect').prop('redirectPath')).toEqual('/login');
    });
  });

  describe('userIsNotAuthenticated', () => {
    it('when user has User role', () => {
      const store = mockStore(userState);
      const wrapper = mount(
        <IsNotAuthenticated store={store} history={history} />
      );

      expect(wrapper.find('UserIsNotAuthenticated(Guest)').length).toEqual(1);
      expect(
        wrapper.find('UserIsNotAuthenticated(Guest)').find('Guest').length
      ).toEqual(0);
      expect(
        wrapper.find('UserIsNotAuthenticated(Guest)').find('FailureComponent')
          .length
      ).toEqual(1);
    });

    it('when user has Guest role', () => {
      const store = mockStore(guestState);
      const wrapper = mount(
        <IsNotAuthenticated store={store} history={history} />
      );

      expect(wrapper.find('UserIsNotAuthenticated(Guest)').length).toEqual(1);
      expect(
        wrapper.find('UserIsNotAuthenticated(Guest)').find('Guest').length
      ).toEqual(1);
      expect(wrapper.find('Guest').text()).toEqual('Welcome guest.');
    });
  });

  describe('userIsNotAuthenticatedRedir', () => {
    it('when user has User role', () => {
      const store = mockStore(userState);
      const wrapper = mount(
        <IsNotAuthenticatedRedir
          store={store}
          history={history}
          location={location}
        />
      );

      expect(wrapper.find('UserIsNotAuthenticated(Guest)').length).toEqual(1);
      expect(
        wrapper.find('UserIsNotAuthenticated(Guest)').find('Guest').length
      ).toEqual(0);
      expect(
        wrapper.find('UserIsNotAuthenticated(Guest)').find('Connect(Redirect)')
          .length
      ).toEqual(1);
      expect(
        wrapper
          .find('UserIsNotAuthenticated(Guest)')
          .find('Connect(Redirect)')
          .find('Redirect').length
      ).toEqual(1);
      expect(wrapper.find('Redirect').prop('redirectPath')).toEqual('/');
    });

    it('when user has Guest role', () => {
      const store = mockStore(guestState);
      const wrapper = mount(
        <IsNotAuthenticatedRedir
          store={store}
          history={history}
          location={location}
        />
      );

      expect(wrapper.find('UserIsNotAuthenticated(Guest)').length).toEqual(1);
      expect(
        wrapper.find('UserIsNotAuthenticated(Guest)').find('Guest').length
      ).toEqual(1);
      expect(wrapper.find('Guest').text()).toEqual('Welcome guest.');
    });
  });

  describe('userIsAdminRedir', () => {
    it('when user has Admin role', () => {
      const store = mockStore(adminState);
      const wrapper = mount(<IsAdminRedir store={store} history={history} />);

      expect(wrapper.find('UserIsAdmin(Admin)').length).toEqual(1);
      expect(wrapper.find('UserIsAdmin(Admin)').find('Admin').length).toEqual(
        1
      );
      expect(wrapper.find('Admin').text()).toEqual('Welcome admin.');
    });

    it('when user has not Admin role', () => {
      const store = mockStore(guestState);
      const wrapper = mount(<IsAdminRedir store={store} history={history} />);

      expect(wrapper.find('UserIsAdmin(Admin)').length).toEqual(1);
      expect(wrapper.find('UserIsAdmin(Admin)').find('Admin').length).toEqual(
        1
      );
      expect(wrapper.text()).toEqual(
        'Access is restricted only to users with Admin role.'
      );
    });
  });
});
