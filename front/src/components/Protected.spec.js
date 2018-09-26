import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Protected from './Protected';

const mockStore = configureMockStore([thunk]);
const initialState = {
  user: {
    id: '5ba88e369040ed1ac67000ab',
    isLoading: false,
    name: 'user',
    role: 'Admin'
  }
};

describe('<Protected/>', () => {
  let store;
  beforeAll(() => {
    store = mockStore({
      ...initialState
    });
  });
  it('should be defined', () => {
    expect(Protected).toBeDefined();
  });
  it('should render correctly', () => {
    const wrapper = mount(<Protected store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should receive authData', () => {
    const wrapper = mount(
      <Protected store={store} authData={initialState.user} />
    );
    expect(wrapper.props().authData).toBeDefined();
  });
});
