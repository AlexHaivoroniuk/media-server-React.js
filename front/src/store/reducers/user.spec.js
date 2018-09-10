import reducer from './user';

describe('reducer user', () => {
  const initialState = {
    id: '0',
    name: 'guest',
    role: 'Guest',
    isLoading: false
  };
  const loggingState = {
    ...initialState,
    isLoading: true
  };
  const loggedState = {
    id: '2',
    name: 'admin',
    role: 'Admin',
    isLoading: false
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle USER_LOGGING_IN', () => {
    expect(reducer(undefined, { type: 'USER_LOGGING_IN' })).toEqual(
      loggingState
    );
  });

  it('should handle USER_LOGGED_IN', () => {
    const action = {
      type: 'USER_LOGGED_IN',
      payload: {
        id: '123',
        username: 'Richard Matthew Stallman',
        role: 'God'
      }
    };
    expect(reducer(undefined, action)).toEqual({
      ...initialState,
      id: '123',
      name: 'Richard Matthew Stallman',
      role: 'God'
    });
  });

  it('should handle USER_LOGGED_OUT', () => {
    const action = {
      type: 'USER_LOGGED_OUT'
    };
    expect(reducer(loggedState, action)).toEqual(initialState);
  });
});
