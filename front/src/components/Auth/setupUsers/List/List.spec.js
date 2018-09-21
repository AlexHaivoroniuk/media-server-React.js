import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import List from './List';

const mockStore = configureMockStore([thunk]);
const user1 = {
  username: 'admin',
  password: '$2b$10$jq.dVFAomuK1wDKCV.gYhuRPbvygVkh3l74EoYNANmWqfpJJQSKmW',
  role: 'Admin',
  id: '5b98'
};
const user2 = {
  username: 'user',
  password: '$2b$10$XSGk64HMpNrB/lBEVtdVyuiaZKYtOViSLIlIjCW/6M5qXQnomN9hm',
  role: 'User',
  id: 'cb1b'
};

const users = [user1, user2];
const state = { setupUsers: users.map(user => ({ ...user, editing: false })) };
const stateEditing = {
  setupUsers: users.map(user => ({ ...user, editing: true }))
};
const stateEmpty = { setupUsers: [] };

function mountComponent(state) {
  const store = mockStore(state);
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <List />
      </Router>
    </Provider>
  );
  return { wrapper, store };
}

describe('<List />', () => {
  it('should be defined', () => {
    expect(List).toBeDefined();
  });

  it('should render correctly', () => {
    const { wrapper } = mountComponent(state);

    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    it('in general case', () => {
      const { wrapper } = mountComponent(state);

      expect(wrapper.find('List').length).toEqual(1);
      expect(wrapper.find('List').find('Connect(User)').length).toEqual(2);
    });

    it('should have <Add/>', () => {
      const { wrapper } = mountComponent(stateEditing);

      expect(wrapper.find('List').length).toEqual(1);
      expect(wrapper.find('List').find('Add').length).toEqual(1);
    });

    it('when movies is not empty', () => {
      const { wrapper } = mountComponent(stateEmpty);

      expect(wrapper.find('List').length).toEqual(1);
      expect(wrapper.find('List').find('Connect(User)').length).toEqual(0);
      expect(wrapper.find('List').find('Connect(Edit)').length).toEqual(0);
    });
  });
});
