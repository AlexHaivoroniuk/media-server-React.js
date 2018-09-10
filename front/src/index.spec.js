import React from 'react';
import ReactDOM from 'react-dom';
import index from './index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
jest.mock('react-dom', () => ({ render: jest.fn() }));
const div = document.createElement('div');
global.document.getElementById = id => id === 'root' && div;

describe('index element', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    index(div);
    global.document.getElementById = id => id === 'root' && div;

    const expectedValue = (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // for unconditional calling index() from index.js
    expect(JSON.stringify(ReactDOM.render.mock.calls[0][0])).toEqual(
      JSON.stringify(expectedValue)
    );
    // for our call of index()
    expect(JSON.stringify(ReactDOM.render.mock.calls[1][0])).toEqual(
      JSON.stringify(expectedValue)
    );
  });
});
