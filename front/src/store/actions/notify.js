import actions from '../actionsTypes';

export const removeNotifById = id => ({
  type: actions.REMOVE_NOTIF_BY_ID,
  id
});

export const notifyMessage = (data, id) => ({
  type: actions.NOTIFY_STREAM_MESSAGE,
  data,
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
    let lastMsgId = null;
    if (e.lastEventId === '-1') {
      console.log('Connection closed');
      eventSource.close();
    }
    if (e.lastEventId !== lastMsgId) {
      dispatch(notifyMessage(JSON.parse(e.data), e.lastEventId));
    }
    lastMsgId = e.lastEventId;
  };
};
