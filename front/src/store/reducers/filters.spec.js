import reducer from './filters';

describe('reducer filters', () => {
  const initialState = {
    genre: [],
    country: [],
    year: {
      minY: 1900,
      maxY: 2018
    },
    toggleFilters: false
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle TOGGLE_FILTERS_PANEL', () => {
    let prevState = {};
    expect(
      reducer(prevState, {
        type: 'TOGGLE_FILTERS_PANEL'
      })
    ).toEqual({ toggleFilters: true });

    prevState = { toggleFilters: true };
    expect(
      reducer(prevState, {
        type: 'TOGGLE_FILTERS_PANEL'
      })
    ).toEqual({ toggleFilters: false });
    prevState = { toggleFilters: false };

    expect(
      reducer(prevState, {
        type: 'TOGGLE_FILTERS_PANEL'
      })
    ).toEqual({ toggleFilters: true });
  });

  it('should handle CLEAR_FILTERS', () => {
    let prevState = {};
    const newState = {
      country: [],
      genre: [],
      year: {
        minY: 1900,
        maxY: 2018
      }
    };
    expect(
      reducer(prevState, {
        type: 'CLEAR_FILTERS'
      })
    ).toEqual(newState);

    prevState = {
      country: ['UA', 'USA'],
      genre: ['thtiller'],
      year: {
        minY: 1976,
        maxY: 1976
      },
      toggleFilters: true
    };
    expect(
      reducer(prevState, {
        type: 'CLEAR_FILTERS'
      })
    ).toEqual({
      ...newState,
      toggleFilters: true
    });
  });

  describe('should handle HANDLE_FILTERS_INPUT', () => {
    const action = {
      type: 'HANDLE_FILTERS_INPUT',
      value: 'UA',
      filter: 'country'
    };

    it('on empty state', () => {
      expect(reducer({}, action)).toEqual({ country: ['UA'] });
    });

    it('when filter is in state', () => {
      expect(
        reducer(
          {
            country: ['USA', 'Canada']
          },
          action
        )
      ).toEqual({ country: ['USA', 'Canada', 'UA'] });
    });

    it('when there is no filter in state', () => {
      expect(
        reducer(
          {
            genre: ['thriller']
          },
          action
        )
      ).toEqual({ country: ['UA'], genre: ['thriller'] });
    });

    it('when value is in state', () => {
      expect(
        reducer(
          {
            country: ['UA', 'USA']
          },
          action
        )
      ).toEqual({ country: ['USA'] });
    });

    it('when there is no value in state', () => {
      expect(
        reducer(
          {
            country: ['USA']
          },
          action
        )
      ).toEqual({ country: ['USA', 'UA'] });
    });
  });

  describe('should handle HANDLE_RANGE_INPUT', () => {
    const action = {
      type: 'HANDLE_RANGE_INPUT',
      val: 1976
    };

    it('when there is no year', () => {
      expect(reducer({}, action)).toEqual({});
    });

    it('when year is minY', () => {
      action.year = 'minY';
      expect(reducer({}, action)).toEqual({ year: { minY: 1976 } });
    });

    it('when year is maxY', () => {
      action.year = 'maxY';
      expect(reducer({}, action)).toEqual({ year: { maxY: 1976 } });
    });

    it('when year is not correct', () => {
      action.year = 'avgY';
      expect(reducer({}, action)).toEqual({});
    });
  });
});
