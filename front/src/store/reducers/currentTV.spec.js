import reducer from './currentTV';

describe('reducer currentTV', () => {
  const initialState = {};
  const tv = {
    id: '2',
    Poster: 'posterTV.img',
    Title: 'Malesuada pellentesque'
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_TV_SUCCESS', () => {
    expect(reducer(undefined, { type: 'FETCH_TV_SUCCESS', tv })).toEqual({
      tv
    });
  });
});
