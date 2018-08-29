import { notify } from './notify';
import notifyStore from './testData/notifStore';

describe('reducer notif', () => {
  it('should return initial state', () => {
    expect(notify(undefined, {})).toEqual([]);
  });
  it('should handle NOTIFY_STREAM_MESSAGE', () => {
    const action = {
      type: 'NOTIFY_STREAM_MESSAGE',
      id: '123',
      data: {
        message: 'Notificatoin message',
        type: 'info',
        label: 'MoviesController.js',
        line: 12,
        level: 'front_info',
        timestamp: '2018-08-29  14:55:32'
      }
    };
    expect(notify([], action)).toEqual([
      {
        id: '123',
        message: 'Notificatoin message',
        type: 'info',
        label: 'MoviesController.js',
        line: 12,
        level: 'front_info',
        timestamp: '2018-08-29  14:55:32'
      }
    ]);
  });
  it('should handle REMOVE_NOTIF_BY_ID', () => {
    const action = {
      type: 'REMOVE_NOTIF_BY_ID',
      id: 'xao8lez4r6gr3t6cpxn5be'
    };
    expect(notify(notifyStore, action).length).not.toEqual(notifyStore.length);
  });
});
