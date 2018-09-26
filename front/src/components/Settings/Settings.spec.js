import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import Settings from './Settings';

const mockStore = configureMockStore([thunk]);

const settingsState = {
  user: {
    id: '5b8e87953d843c24a101ce6b',
    name: 'm1',
    role: 'Admin',
    isLoading: false
  },
  libraries: [
    {
      _id: '5b8fcbb02e6ea338fa4e28dd',
      name: 'MyFolder',
      path: '/home/myFolder',
      userId: '5b8e87953d843c24a101ce6b'
    },
    {
      _id: '5b8fcbb02e6ea338fa4e28dd',
      name: 'mov2011',
      path: '/home/mov',
      userId: '5b8e87953d843c24a101ce6b'
    }
  ]
};

describe('<Settings/>', () => {
  let store;
  beforeAll(() => {
    store = mockStore({
      ...settingsState
    });
  });

  it('should be defined', () => {
    expect(Settings).toBeDefined();
  });
  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Settings />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should handleTab()', () => {
    const wrapper = shallow(<Settings />);
    wrapper
      .find('.Settings__list__item')
      .at(0)
      .simulate('click');
    expect(wrapper.state('activeIdx')).toEqual('users');
  });

  describe('should have correct structure', () => {
    let store, wrapper;
    beforeEach(() => {
      store = mockStore({
        ...settingsState
      });
      wrapper = mount(
        <Provider store={store}>
          <Settings />
        </Provider>
      );
    });
    it('should have Settings', () => {
      expect(wrapper.find('.Settings').length).toEqual(1);
    });
    describe('Settings__list', () => {
      it('should have Settings__list', () => {
        expect(wrapper.find('.Settings__list').length).toEqual(1);
      });
      it('should have Settings__list__item', () => {
        expect(wrapper.find('.Settings__list__item').length).toEqual(2);
      });
    });
    describe('Settings__content', () => {
      it('should have Settings__content', () => {
        expect(wrapper.find('.Settings__content').length).toEqual(1);
      });
    });
  });
});
