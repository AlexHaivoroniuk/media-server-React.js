import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AddContainer, { Add } from './Add';

const mockStore = configureMockStore([thunk]);
const initialState = {
  users: []
};

describe('<Add />', () => {
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<AddContainer store={store} />);
  });

  it('should be defined', () => {
    expect(Add).toBeDefined();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    it('should have div.auth and form with fieldset', () => {
      expect(wrapper.find('Add').length).toEqual(1);
      expect(wrapper.find('Add').find('.AddUser').length).toEqual(1);
      expect(wrapper.find('.AddUser').find('form').length).toEqual(1);
    });

    it('form should have a inputs and select', () => {
      const form = wrapper.find('form');
      expect(form.find('input').length).toEqual(2);
      expect(form.find('select').length).toEqual(1);
      expect(
        form
          .find('input')
          .at(0)
          .prop('name')
      ).toEqual('username');
      expect(
        form
          .find('input')
          .at(1)
          .prop('name')
      ).toEqual('password');
      expect(
        form
          .find('select')
          .at(0)
          .prop('name')
      ).toEqual('role');
    });

    it('form should have a button', () => {
      expect(wrapper.find('form').find('button').length).toEqual(1);
      expect(
        wrapper
          .find('form')
          .find('button')
          .text()
      ).toEqual('Add');
    });

    it('submit form', () => {
      const mockFn = jest.fn();
      wrapper = mount(<Add store={store} userCreate={mockFn} />);
      const bt = wrapper.find('Button');
      bt.simulate('click');
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
