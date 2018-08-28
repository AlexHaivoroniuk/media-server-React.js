import actions from '../actionsTypes';

export const removeNotifById = id => ({
  type: actions.REMOVE_NOTIF_BY_ID,
  id
});

export const notifStreamConnect = data => (dispatch, getState) => {
  const eventSource = new EventSource('http://localhost:4000/notif_stream');

  eventSource.onopen = function(e) {
    console.log('REDUX| SSE opened');
  };
  eventSource.onerror = function(e) {
    if (this.readyState === EventSource.CONNECTING) {
      console.log('REDUX| Connection is lost, reconecting...');
    } else {
      console.log('REDUX| Error, state: ' + this.readyState);
    }
  };
  eventSource.onmessage = function(e) {
    if (e.lastEventId === '-1') {
      eventSource.close();
    }
    // console.log(e);
    console.log('REDUX| Data received: ' + e.data);
    dispatch({
      type: actions.NOTIFY_STREAM_MESSAGE,
      data: JSON.parse(e.data),
      id: e.lastEventId
    });
  };
};
