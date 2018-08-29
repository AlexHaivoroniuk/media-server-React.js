import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './notify';

const mockStore = configureMockStore([thunk]);

const initialState = {
  notify: []
};

describe('action notify', () => {
  let action, store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should create REMOVE_NOTIF_BY_ID', () => {
    store.dispatch(actions.removeNotifById('123'));
    action = store.getActions();
    expect(action).toEqual([{ type: 'REMOVE_NOTIF_BY_ID', id: '123' }]);
  });
  it('should create NOTIFY_STREAM_MESSAGE', () => {
    const stream = new EventSource('http://localhost:4000/notif_stream');
    stream.onmessage = e => {
      store.dispatch({
        type: 'NOTIFY_STREAM_MESSAGE',
        data: e.data,
        id: e.lastEventId
      });
      action = store.getActions();
      expect(action).toEqual([
        { type: 'NOTIFY_STREAM_MESSAGE', data: 'data', id: '123' }
      ]);
    };
    stream.emitMessage({ lastEventId: '123', data: 'data' });
  });
});
