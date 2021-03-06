import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import Loading from './components/Auth/Loading';
import Admin from './components/Auth/Admin';

const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state =>
    state.user !== null && state.user.role !== 'Guest',
  authenticatingSelector: state => state.user.isLoading,
  wrapperDisplayName: 'UserIsAuthenticated'
};

export const userIsAuthenticated = connectedAuthWrapper(
  userIsAuthenticatedDefaults
);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: '/login'
});

export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath: '/',
  //allowRedirectBack: false,
  allowRedirectBack: true,
  authenticatedSelector: state =>
    state.user !== null && state.user.role === 'Admin',
  //predicate: user => user.role === 'Admin',
  FailureComponent: Admin,
  wrapperDisplayName: 'UserIsAdmin'
});

const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state =>
    state.user && state.user.role === 'Guest' && state.user.isLoading === false,
  wrapperDisplayName: 'UserIsNotAuthenticated'
};

export const userIsNotAuthenticated = connectedAuthWrapper(
  userIsNotAuthenticatedDefaults
);

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false
});
