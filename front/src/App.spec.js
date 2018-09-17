import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
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
const store = mockStore(initialState);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
