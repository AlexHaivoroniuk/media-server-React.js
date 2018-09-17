import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import UserContainer, { User } from './User';

const mockStore = configureMockStore([thunk]);
const initialState = {
  users: []
};
const user = {
  id: '987',
  username: 'taras',
  role: 'User'
};

describe('<User />', () => {
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<UserContainer store={store} user={user} />);
  });

  it('should be defined', () => {
    expect(User).toBeDefined();
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
        userT.id = 123;
        wrapper = mount(<UserContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(1);
      });
      it('when it is string', () => {
        userT.id = '123';
        wrapper = mount(<UserContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });
    });

    describe('user.username should be string', () => {
      it('when it is not string', () => {
        userT.username = false;
        wrapper = mount(<UserContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(1);
      });
      it('when it is string', () => {
        userT.username = 'stepan';
        wrapper = mount(<UserContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });
    });

    describe('user.role should be string', () => {
      it('when it is not string', () => {
        userT.role = true;
        wrapper = mount(<UserContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(1);
      });
      it('when it is string', () => {
        userT.username = 'Admin';
        wrapper = mount(<UserContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });
    });
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    it('should have div.User', () => {
      expect(wrapper.find('User').length).toEqual(1);
      expect(wrapper.find('User').find('.User').length).toEqual(1);
    });

    it('form should have a button Edit and a button Delete', () => {
      expect(wrapper.find('.User').find('button').length).toEqual(2);
      const bts = wrapper.find('.User').find('button');
      expect(bts.at(0).text()).toEqual('Edit');
      expect(bts.at(1).text()).toEqual('Delete');
    });

    describe('clicking on the Edit button', () => {
      it('should call update', () => {
        const mockFn = jest.fn();
        wrapper = mount(<User store={store} user={user} edit={mockFn} />);
        const bt = wrapper.find('button.edit');
        bt.simulate('click');
        expect(mockFn).toHaveBeenCalled();
      });

      it('should call dispatch', () => {
        const mockFn = jest.fn();
        store.dispatch = mockFn;
        wrapper = mount(<UserContainer store={store} user={user} />);
        const bt = wrapper.find('button.edit');
        bt.simulate('click');
        expect(mockFn).toHaveBeenCalledWith({ id: '987', type: 'USER_EDIT' });
      });
    });

    describe('clicking on the Delete button', () => {
      beforeEach(() => {
        window.confirm = function() {
          return true;
        };
      });

      it('should call cancel', () => {
        const mockFn = jest.fn();
        wrapper = mount(<User store={store} user={user} delete={mockFn} />);
        const bt = wrapper.find('button.delete');
        bt.simulate('click');
        expect(mockFn).toHaveBeenCalled();
      });

      it('should call dispatch', () => {
        const mockFn = jest.fn();
        store.dispatch = mockFn;
        wrapper = mount(<UserContainer store={store} user={user} />);
        const bt = wrapper.find('button.delete');
        bt.simulate('click');
        expect(mockFn).toHaveBeenCalled();
      });
    });
  });
});
