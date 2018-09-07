import reducer from './libraries';

describe('reducer libraries', () => {
  const initialState = [];

  it('should return initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });
  it('should handle FETCH_LIBRARIES', () => {
    const action = {
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
    expect(reducer(undefined, action)).toEqual([
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
  });
});
