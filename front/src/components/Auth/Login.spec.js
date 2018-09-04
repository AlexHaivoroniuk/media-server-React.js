import React from 'react';
import { mount, render, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import LoginContainer, { Login } from './Login';

const mockStore = configureMockStore([thunk]);
const initialState = {};

describe('<Login />', () => {
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<LoginContainer store={store} />);
  });

  it('should be defined', () => {
    expect(Login).toBeDefined();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    expect(wrapper.find('.login').length).toEqual(1);
    expect(wrapper.find('.login').find('.username').length).toEqual(1);
    expect(wrapper.find('.login').find('.password').length).toEqual(1);
    expect(wrapper.find('.login').find('button.button').length).toEqual(1);
    expect(
      wrapper
        .find('.login')
        .find('.button')
        .text()
    ).toEqual('Login');
  });

  it('should handle the click event', () => {
    console.log(wrapper.debug());
    // todo
  });
});
