import reducer from './filterData';

describe('reducer filters', () => {
  const initialState = {
    genres: [],
    countries: []
  };
  const filterDateState = {
    genres: ['ab', 'cd', 'ef'],
    countries: ['UK', 'UA']
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_FILTER_DATA_START', () => {
    expect(reducer(undefined, { type: 'FETCH_MOVIES_START' })).toEqual(
      initialState
    );
  });

  it('should handle FETCH_FILTER_DATA_SUCCESS', () => {
    const action = {
      type: 'FETCH_FILTER_DATA_SUCCESS',
      filterData: { genres: ['a', 'b'], countries: ['x', 'q'] }
    };
    expect(reducer(undefined, action)).toEqual({
      countries: ['x', 'q'],
      genres: ['a', 'b']
    });
  });

  it('should handle FETCH_FILTER_DATA_FAILURE', () => {
    const action = {
      type: 'FETCH_FILTER_DATA_FAILURE',
      error: new Error('erro')
    };
    expect(reducer(filterDateState, action)).toEqual(filterDateState);
  });
});
