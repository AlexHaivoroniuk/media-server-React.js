import { movies } from './movies';
import moviesdata from './testData/movies.state.json';

describe('reducer movies', () => {
  const initialState = {};

  it('should return initial state', () => {
    expect(movies(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_MOVIES_START', () => {
    expect(movies({}, { type: 'FETCH_MOVIES_START' })).toEqual({});
  });

  describe('should handle FETCH_MOVIES_SUCCESS', () => {
    const action = {
      type: 'FETCH_MOVIES_SUCCESS',
      movies: [{ Title: '1' }]
    };
    it('when Title is present', () => {
      expect(movies({}, action)).toEqual({
        movies: [{ Title: '1' }],
        moviesDefault: [{ Title: '1' }]
      });
    });
    it('when Title is missing', () => {
      action.movies.push({ tutle: '2' });
      expect(movies({}, action)).toEqual({
        movies: [{ Title: '1' }],
        moviesDefault: [{ Title: '1' }]
      });
    });
  });

  it('should handle FETCH_MOVIES_FAILURE', () => {
    expect(movies({}, { type: 'FETCH_MOVIES_FAILURE' })).toEqual({});
  });

  it('should handle RESET_MOVIES', () => {
    expect(
      movies(
        {
          movies: [],
          moviesDefault: [{ Title: '1' }]
        },
        { type: 'RESET_MOVIES' }
      )
    ).toEqual({
      movies: [{ Title: '1' }],
      moviesDefault: [{ Title: '1' }]
    });
  });

  it('should handle SORT_ALPHA_DESC', () => {
    expect(
      movies(
        {
          movies: [{ Title: 'Abc' }, { Title: 'Aaa' }, { Title: 'BBC' }]
        },
        { type: 'SORT_ALPHA_DESC' }
      )
    ).toEqual({
      movies: [{ Title: 'Aaa' }, { Title: 'Abc' }, { Title: 'BBC' }]
    });
  });

  it('should handle SORT_ALPHA_ASC', () => {
    expect(
      movies(
        {
          movies: [{ Title: 'Aaa' }, { Title: 'BBC' }, { Title: 'Abc' }]
        },
        { type: 'SORT_ALPHA_ASC' }
      )
    ).toEqual({
      movies: [{ Title: 'BBC' }, { Title: 'Abc' }, { Title: 'Aaa' }]
    });
  });

  describe('should handle FILTER_MOVIES', () => {
    it('when there is only one genre', () => {
      const filters = {
        ...moviesdata.filters,
        genre: ['Biography']
      };
      const prevState = moviesdata.movies;
      const newState = movies(prevState, {
        type: 'FILTER_MOVIES',
        filters
      });
      const expectedState = {
        ...prevState,
        movies: [
          {
            _id: '5b7d5357b38d712add14c721',
            Title: 'The Insider',
            Year: '1999',
            Genre: 'Biography, Drama, Thriller',
            Country: 'USA'
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });

    it('when there is only one country', () => {
      const filters = {
        ...moviesdata.filters,
        country: ['France']
      };
      const prevState = moviesdata.movies;
      const newState = movies(prevState, {
        type: 'FILTER_MOVIES',
        filters
      });
      const expectedState = {
        ...prevState,
        movies: [
          {
            _id: '5b7d51e5ec97a229595b464b',
            Title: 'Basic Instinct',
            Year: '1992',
            Genre: 'Drama, Mystery, Thriller',
            Country: 'France, USA, UK'
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });

    it('when there are only minY and maxY', () => {
      const filters = {
        ...moviesdata.filters,
        year: { minY: 2010, maxY: 2016 }
      };
      const prevState = moviesdata.movies;
      const newState = movies(prevState, {
        type: 'FILTER_MOVIES',
        filters
      });
      const expectedState = {
        ...prevState,
        movies: [
          {
            _id: '5b7d5357b38d712add14c71d',
            Title: 'The Lincoln Lawyer',
            Year: '2011',
            Genre: 'Crime, Drama, Thriller',
            Country: 'USA'
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });

    it('when there are several genres', () => {
      const filters = {
        ...moviesdata.filters,
        genre: ['Drama', 'Music']
      };
      const prevState = moviesdata.movies;
      const newState = movies(prevState, {
        type: 'FILTER_MOVIES',
        filters
      });
      const expectedState = {
        ...prevState,
        movies: [
          {
            _id: '5b7d51e5ec97a229595b464f',
            Title: 'Take the Lead',
            Year: '2006',
            Genre: 'Drama, Music',
            Country: 'USA'
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });

    it('when there are several countries', () => {
      const filters = {
        ...moviesdata.filters,
        country: ['France', 'UK']
      };
      const prevState = moviesdata.movies;
      const newState = movies(prevState, {
        type: 'FILTER_MOVIES',
        filters
      });

      const expectedState = {
        ...prevState,
        movies: [
          {
            _id: '5b7d51e5ec97a229595b464b',
            Title: 'Basic Instinct',
            Year: '1992',
            Genre: 'Drama, Mystery, Thriller',
            Country: 'France, USA, UK'
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });

    it('when there are both genre and country', () => {
      const filters = {
        ...moviesdata.filters,
        genre: ['Thriller', 'Drama'],
        country: ['France', 'UK']
      };
      const prevState = moviesdata.movies;
      const newState = movies(prevState, {
        type: 'FILTER_MOVIES',
        filters
      });
      const expectedState = {
        ...prevState,
        movies: [
          {
            _id: '5b7d51e5ec97a229595b464b',
            Title: 'Basic Instinct',
            Year: '1992',
            Genre: 'Drama, Mystery, Thriller',
            Country: 'France, USA, UK'
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });

    it('when there are both genre and year', () => {
      const filters = {
        ...moviesdata.filters,
        genre: ['Drama'],
        year: { minY: 2001, maxY: 2016 }
      };
      const prevState = moviesdata.movies;
      const newState = movies(prevState, {
        type: 'FILTER_MOVIES',
        filters
      });
      const expectedState = {
        ...prevState,
        movies: [
          {
            _id: '5b7d51e5ec97a229595b464f',
            Title: 'Take the Lead',
            Year: '2006',
            Genre: 'Drama, Music',
            Country: 'USA'
          },
          {
            _id: '5b7d5357b38d712add14c71d',
            Title: 'The Lincoln Lawyer',
            Year: '2011',
            Genre: 'Crime, Drama, Thriller',
            Country: 'USA'
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });

    it('when there are both country and year', () => {
      const filters = {
        ...moviesdata.filters,
        country: ['USA', 'UK'],
        year: { minY: 1990, maxY: 1999 }
      };
      const prevState = moviesdata.movies;
      const newState = movies(prevState, {
        type: 'FILTER_MOVIES',
        filters
      });
      const expectedState = {
        ...prevState,
        movies: [
          {
            _id: '5b7d51e5ec97a229595b464b',
            Title: 'Basic Instinct',
            Year: '1992',
            Genre: 'Drama, Mystery, Thriller',
            Country: 'France, USA, UK'
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });

    it('when there are present genre, country and year', () => {
      const filters = {
        ...moviesdata.filters,
        genre: ['Crime'],
        country: ['USA'],
        year: { minY: 1991, maxY: 2000 }
      };
      const prevState = moviesdata.movies;
      const newState = movies(prevState, {
        type: 'FILTER_MOVIES',
        filters
      });
      const expectedState = {
        ...prevState,
        movies: [
          {
            _id: '5b7d4ec5ee778e259f3d2d6c',
            Title: 'The Silence of the Lambs',
            Year: '1991',
            Genre: 'Crime, Drama, Thriller',
            Country: 'USA'
          },
          {
            _id: '5b7d54b0025e5d2ca4eab17d',
            Title: 'The Whole Nine Yards',
            Year: '2000',
            Genre: 'Comedy, Crime',
            Country: 'USA'
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });
  });
});
