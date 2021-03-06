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
        expect(console.error).toHaveBeenCalled();
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
        expect(console.error).toHaveBeenCalled();
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
        expect(console.error).toHaveBeenCalled();
      });
      it('when it is string', () => {
        userT.username = 'Admin';
        wrapper = mount(<UserContainer store={store} user={userT} />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });
    });
  });
  it('should toggleModal() on click', () => {
    wrapper = mount(<UserContainer store={store} user={user} />);
    wrapper
      .find('.User__content__controls__delete')
      .last()
      .simulate('click');
    const spy = jest.spyOn(wrapper.find('User').instance(), 'toggleModal');
    expect(wrapper.find('Modal')).toBeDefined();
    wrapper
      .find('Modal')
      .find('button.Button')
      .at(0)
      .simulate('click');
    wrapper
      .find('Modal')
      .find('button.Button')
      .at(1)
      .simulate('click');
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    it('should have div.User', () => {
      expect(wrapper.find('User').length).toEqual(1);
      expect(wrapper.find('User').find('.User').length).toEqual(1);
    });
    describe('User__content', () => {
      it('should have User__content', () => {
        expect(wrapper.find('User').length).toEqual(1);
        expect(wrapper.find('User').find('.User__content').length).toEqual(1);
      });
      describe('User__content__info', () => {
        it('should have User__content__info', () => {
          expect(wrapper.find('User').length).toEqual(1);
          expect(
            wrapper.find('User').find('.User__content__info').length
          ).toEqual(1);
        });
        it('should have User__content__info__name', () => {
          expect(wrapper.find('User').length).toEqual(1);
          expect(
            wrapper.find('User').find('.User__content__info').length
          ).toEqual(1);
        });
        it('should have User__content__info roleInfo', () => {
          expect(wrapper.find('User').length).toEqual(1);
          expect(
            wrapper.find('User').find('.User__content__info').length
          ).toEqual(1);
        });
      });
      describe('User__content__controls', () => {
        it('should have User__content__controls', () => {
          expect(wrapper.find('User').length).toEqual(1);
          expect(
            wrapper.find('User').find('.User__content__controls').length
          ).toEqual(1);
        });
        describe('User__content__controls__edit', () => {
          it('should have User__content__controls__edit', () => {
            expect(wrapper.find('User').length).toEqual(1);
            expect(
              wrapper.find('User').find('.User__content__controls').length
            ).toEqual(1);
          });
          it('should open Edit window onClick', () => {
            const mockEdit = jest.fn();
            wrapper = mount(<User store={store} user={user} edit={mockEdit} />);
            const bt = wrapper.find('.User__content__controls__edit');
            bt.simulate('click');
            expect(wrapper.find('Edit')).toBeDefined();
            expect(wrapper.state().editing).toBeTruthy();
            expect(mockEdit).toHaveBeenCalled();
          });
          it('should call dispatch', () => {
            const mockFn = jest.fn();
            store.dispatch = mockFn;
            wrapper = mount(<UserContainer store={store} user={user} />);
            const bt = wrapper.find('.User__content__controls__edit');
            bt.simulate('click');
            expect(mockFn).toHaveBeenCalledWith({
              id: '987',
              type: 'USER_EDIT'
            });
          });
        });
        describe('User__content__controls__delete', () => {
          it('should have User__content__controls__delete', () => {
            expect(wrapper.find('User').length).toEqual(1);
            expect(
              wrapper.find('User').find('.User__content__controls').length
            ).toEqual(1);
          });
          it('should open Modal onClick', () => {
            const mockFn = jest.fn();
            wrapper = mount(<User store={store} user={user} delete={mockFn} />);
            const bt = wrapper.find('.User__content__controls__delete');
            bt.simulate('click');
            expect(wrapper.find('Modal')).toBeDefined();
            expect(wrapper.state().showModal).toBeTruthy();
          });
          it('should call dispatch', () => {
            const mockFn = jest.fn();
            store.dispatch = mockFn;
            wrapper = mount(
              <UserContainer store={store} user={user} delete={mockFn} />
            );
            const bt = wrapper.find('.User__content__controls__delete');
            bt.simulate('click');
            wrapper
              .find('Modal')
              .find('Button')
              .at(0)
              .simulate('click');
            expect(mockFn).toHaveBeenCalled();
          });
        });
      });

      it('should  dispatch <Edit/> update', () => {
        const mockFn = jest.fn();
        store.dispatch = mockFn;
        wrapper = mount(
          <UserContainer store={store} user={user} update={mockFn} />
        );
        wrapper
          .find('.EditUser__form__inputGroup__button')
          .find('button.Button')
          .at(0)
          .simulate('click');
        expect(mockFn).toHaveBeenCalledTimes(1);
      });
      it('should  dispatch <Edit/> cancelAction', () => {
        const mockFn = jest.fn();
        store.dispatch = mockFn;
        wrapper = mount(
          <UserContainer store={store} user={user} update={mockFn} />
        );
        wrapper
          .find('.EditUser__form__inputGroup__button')
          .find('button.Button')
          .at(1)
          .simulate('click');
        expect(mockFn).toHaveBeenCalledTimes(1);
      });
    });
  });
});
