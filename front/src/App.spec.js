import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const notify1 = {
  message: 'FRONT Not found',
  type: 'error',
  label: 'MoviesController.js',
  line: 36,
  level: 'front_info',
  timestamp: '2018-09-17  10:58:50',
  id: 'cjpgcvsuv3dxm6vtei5prh'
};
const notify2 = {
  message: 'FRONT Got All Movies',
  type: 'info',
  label: 'MoviesController.js',
  line: 12,
  level: 'front_info',
  timestamp: '2018-09-17  11:54:12',
  id: '6krle6ybri31hyoef0bdhn'
};

const initialState = {
  currentMovie: {},
  filterData: {
    genres: [],
    countries: []
  },
  filters: {
    genre: [],
    country: [],
    year: {
      minY: 1900,
      maxY: 2018
    },
    toggleFilters: false
  },
  movies: [],
  moviesDefault: [],
  notify: [],
  user: {
    id: '0',
    name: 'guest',
    role: 'Guest',
    isLoading: false
  }
};
const notifyState = { ...initialState, notify: [notify1, notify2] };

function mountComponent(state) {
  const store = mockStore(state);
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  return { wrapper, store };
}

describe('<App />', () => {
  beforeEach(() => {
    //window.EventSource = jest.fn();
  });

  it('should be defined', () => {
    expect(App).toBeDefined();
  });

  it('should render correctly', () => {
    const { wrapper } = mountComponent(initialState);

    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    it('in general case', () => {
      const { wrapper } = mountComponent(initialState);

      expect(wrapper.find('App').length).toEqual(1);
      expect(wrapper.find('App').find('Toolbar').length).toEqual(1);
      expect(wrapper.find('App').find('Connect(SideNav)').length).toEqual(1);
      expect(wrapper.find('App').find('ErrorBoundary').length).toEqual(1);
      expect(
        wrapper.find('ErrorBoundary').find('ContentContainer').length
      ).toEqual(1);
    });

    it('when notify is empty', () => {
      const { wrapper } = mountComponent(initialState);

      expect(wrapper.find('App').find('.NotifWrapper').length).toEqual(0);
    });

    it('when notify is not empty', () => {
      const { wrapper } = mountComponent(notifyState);

      expect(wrapper.find('App').find('.NotifWrapper').length).toEqual(1);
      expect(wrapper.find('.NotifWrapper').find('SnackBar').length).toEqual(2);
    });

    it('should work properly when toggle Sidenav', () => {
      const { wrapper } = mountComponent(initialState);

      const menu = wrapper.find('SideNav').find('.SideNav__Backdrop');
      menu.simulate('click');
      expect(wrapper.find('App').instance().state).toEqual({
        style: '250px',
        display: 'block'
      });
      menu.simulate('click');
      expect(wrapper.find('App').instance().state).toEqual({
        style: '0px',
        display: 'none'
      });
    });
  });

  it('should work properly when click on SnackBar', () => {
    const { wrapper, store } = mountComponent(notifyState);

    store.clearActions();
    const snacks = wrapper.find('SnackBar');
    snacks
      .at(0)
      .find('.SnackBar_Close')
      .simulate('click');
    let action = store.getActions();
    expect(action).toEqual([
      { id: 'cjpgcvsuv3dxm6vtei5prh', type: 'REMOVE_NOTIF_BY_ID' }
    ]);
  });
});
