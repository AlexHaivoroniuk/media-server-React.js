import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import EditContainer, { Edit } from './Edit';

const mockStore = configureMockStore([thunk]);
const initialState = {
  users: []
};
const user = {
  id: '12',
  username: 'name',
  role: 'User'
};

describe('<Edit />', () => {
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<EditContainer store={store} user={user} />);
  });

  it('should be defined', () => {
    expect(Edit).toBeDefined();
  });

  describe('PropTypes', () => {
    let userT;

    beforeEach(() => {
      console.error = jest.fn();
      userT = { ...user };
    });

    afterEach(() => {
      console.error.mockRestore();
    });

    describe('user.id should be string', () => {
      it('when it is not string', () => {
        userT.id = true;
        wrapper = mount(<EditContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(1);
      });
      it('when it is string', () => {
        userT.id = '123';
        wrapper = mount(<EditContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });
    });

    describe('user.username should be string', () => {
      it('when it is not string', () => {
        userT.username = 55;
        wrapper = mount(<EditContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(1);
      });
      it('when it is string', () => {
        userT.username = 'vasyl';
        wrapper = mount(<EditContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });
    });

    describe('user.role should be string', () => {
      it('when it is not string', () => {
        userT.role = false;
        wrapper = mount(<EditContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(1);
      });
      it('when it is string', () => {
        userT.username = 'Admin';
        wrapper = mount(<EditContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });
    });
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    it('should have div.auth and form with fieldset', () => {
      expect(wrapper.find('Edit').length).toEqual(1);
      expect(wrapper.find('Edit').find('.auth').length).toEqual(1);
      expect(wrapper.find('.auth').find('form').length).toEqual(1);
    });

    it('form should have a fieldset', () => {
      expect(wrapper.find('form').find('fieldset').length).toEqual(1);
      expect(wrapper.find('fieldset').find('legend').length).toEqual(1);
      expect(
        wrapper
          .find('fieldset')
          .find('legend')
          .text()
      ).toEqual('Edit user: name');
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

    it('form should have a button Edit and a button Cancel', () => {
      expect(wrapper.find('form').find('button').length).toEqual(2);
      const bts = wrapper.find('form').find('button');
      expect(bts.at(0).text()).toEqual('Save');
      expect(bts.at(1).text()).toEqual('Cancel');
    });

    describe('submit form', () => {
      it('should call update', () => {
        const mockFn = jest.fn();
        wrapper = mount(<Edit store={store} user={user} update={mockFn} />);
        const bt = wrapper.find('button.button').at(0);
        bt.simulate('click');
        expect(mockFn).toHaveBeenCalled();
      });

      it('should call dispatch', () => {
        const mockFn = jest.fn();
        store.dispatch = mockFn;
        wrapper = mount(<EditContainer store={store} user={user} />);
        const bt = wrapper.find('button.button').at(0);
        bt.simulate('click');
        expect(mockFn).toHaveBeenCalled();
      });
    });

    describe('cancel form', () => {
      it('should call cancel', () => {
        const mockFn = jest.fn();
        wrapper = mount(<Edit store={store} user={user} cancel={mockFn} />);
        const bt = wrapper.find('button.button').at(1);
        bt.simulate('click');
        expect(mockFn).toHaveBeenCalled();
      });

      it('should call dispatch', () => {
        const mockFn = jest.fn();
        store.dispatch = mockFn;
        wrapper = mount(<EditContainer store={store} user={user} />);
        const bt = wrapper.find('button.button').at(1);
        bt.simulate('click');
        expect(mockFn).toHaveBeenCalledWith({ id: '12', type: 'USER_EDIT' });
      });
    });
  });
});
