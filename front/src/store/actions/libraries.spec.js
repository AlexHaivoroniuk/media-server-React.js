import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import * as actions from './libraries';

const mockStore = configureMockStore([thunk]);
let mockAxios = new AxiosMockAdapter(axios);

const initialState = {
  libraries: []
};

const fetchURL = 'http://localhost:4000/libraries';
const fetchLibAction = {
  type: 'FETCH_LIBRARIES',
  data: [
    {
      _id: '5b8fcbb02e64348fa4e28dd',
      name: 'MyFolder',
      path: 'home/mov',
      userId: '5b8e87953d843c24a101ce6b',
      __v: 0
    },
    {
      _id: '5b8fcbb02e6ea338fa4e28dd',
      name: 'Movies2018',
      path: 'home/mov2018',
      userId: '5b8e87953ddsfc24a101ce6b',
      __v: 0
    }
  ]
};

describe('action libraries', () => {
  let action, store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  afterEach(() => {
    mockAxios.reset();
  });
  it('should fetch libraries', () => {
    mockAxios.onGet(fetchURL).reply(200, [
      {
        _id: '5b8fcbb02e64348fa4e28dd',
        name: 'MyFolder',
        path: 'home/mov',
        userId: '5b8e87953d843c24a101ce6b',
        __v: 0
      },
      {
        _id: '5b8fcbb02e6ea338fa4e28dd',
        name: 'Movies2018',
        path: 'home/mov2018',
        userId: '5b8e87953ddsfc24a101ce6b',
        __v: 0
      }
    ]);
    return store.dispatch(actions.fetchLibraries()).then(() => {
      action = store.getActions();
      expect(action).toEqual([fetchLibAction]);
    });
  });
});
