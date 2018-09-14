import reducer from './setupUsers';

const user1 = {
  username: 'admin',
  password: '$2b$10$jq.dVFAomuK1wDKCV.gYhuRPbvygVkh3l74EoYNANmWqfpJJQSKmW',
  role: 'Admin',
  id: '5b98'
};
const user2 = {
  username: 'user',
  password: '$2b$10$XSGk64HMpNrB/lBEVtdVyuiaZKYtOViSLIlIjCW/6M5qXQnomN9hm',
  role: 'User',
  id: 'cb1b'
};
const user3 = {
  username: 'guest',
  password: '$2b$`0$XSGk64HMEEWFBtdVtdVyuiaZFDKYtOViSLIlIjCW/6M5qXQklvcmx',
  role: 'Guest',
  id: 'ad9e'
};

const users = [user1, user2];
const state = users.map(user => ({ ...user, editing: false }));

describe('reducer setupUsers', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle USER_EDIT', () => {
    expect(reducer(state, { type: 'USER_EDIT', id: '5b98' })).toEqual(
      state.map(
        user =>
          user.id === '5b98' ? { ...user, editing: !user.editing } : user
      )
    );
  });

  it('should handle USER_FAILURE', () => {
    expect(reducer(state, { type: 'USER_FAILURE' })).toEqual(state);
  });

  it('should handle USER_FETCH_START', () => {
    expect(reducer(state, { type: 'USER_FETCH_START' })).toEqual(state);
  });

  it('should handle USER_FETCH_SUCCESS when state is empty', () => {
    expect(reducer([], { type: 'USER_FETCH_SUCCESS', users: state })).toEqual(
      state
    );
  });

  it('should handle USER_FETCH_SUCCESS when state is not empty', () => {
    expect(
      reducer(state, { type: 'USER_FETCH_SUCCESS', users: state })
    ).toEqual(state);
  });

  it('should handle USER_FETCH_FAILURE', () => {
    expect(reducer([], { type: 'USER_FETCH_FAILURE', e: 'error' })).toEqual([]);
  });

  it('should handle USER_CREATE_SUCCESS', () => {
    expect(
      reducer(state, {
        type: 'USER_CREATE_SUCCESS',
        data: { ...user3, editing: false }
      })
    ).toEqual([...state, { ...user3, editing: false }]);
  });

  it('should handle USER_UPDATE_SUCCESS', () => {
    const data = {
      ...user2,
      username: 'manager',
      role: 'Manager'
    };
    const prevstate = [state[0], { ...state[1], editing: true }];

    expect(
      reducer(prevstate, {
        type: 'USER_UPDATE_SUCCESS',
        data
      })
    ).toEqual([
      state[0],
      { ...state[1], username: 'manager', role: 'Manager' }
    ]);
  });

  it('should handle USER_DELETE_SUCCESS', () => {
    expect(
      reducer(state, {
        type: 'USER_DELETE_SUCCESS',
        id: 'cb1b'
      })
    ).toEqual([state[0]]);
  });
});
