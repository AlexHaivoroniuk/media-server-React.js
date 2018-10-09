import reducer from './currentMovie';

describe('reducer currentMovie', () => {
  const initialState = {};
  const movie = {
    id: '9',
    Poster: 'poster.img',
    Title: 'At auctor urna'
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_MOVIE_SUCCESS', () => {
    expect(reducer(undefined, { type: 'FETCH_MOVIE_SUCCESS', movie })).toEqual({
      movie
    });
  });
});
