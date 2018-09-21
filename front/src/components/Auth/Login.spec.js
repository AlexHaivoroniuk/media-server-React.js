import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import LoginContainer, { Login } from './Login';

const mockStore = configureMockStore([thunk]);
const initialState = {};

describe('<Login />', () => {
  let store, wrapper, mockFn;

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
    expect(wrapper.find('.auth').length).toEqual(1);
    expect(wrapper.find('.auth').find('.username').length).toEqual(1);
    expect(wrapper.find('.auth').find('.password').length).toEqual(1);
    expect(wrapper.find('.auth').find('Button').length).toEqual(1);
    expect(
      wrapper
        .find('.auth')
        .find('Button')
        .text()
    ).toEqual('Login');
  });

  it('should handle the click event', () => {
    mockFn = jest.fn();
    wrapper = mount(<Login store={store} userLogin={mockFn} />);
    wrapper
      .find('.auth')
      .find('Button')
      .simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
