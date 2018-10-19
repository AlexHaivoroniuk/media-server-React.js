import actions from '../actionsTypes';

const sortAZ = (sortOrder, movies) => {
  return movies.slice().sort(function(a, b) {
    if (sortOrder === 0) [b, a] = [a, b];
    if (a.Title > b.Title) return -1;
    if (a.Title < b.Title) return 1;
    return 0;
  });
};

const filterBy = (curMovies, field, filters) => {
  if (field === 'year') {
    return curMovies.filter(elem => {
      if (elem.Type === 'tv') {
        if (
          elem.Year.First > filters.year.maxY ||
          elem.Year.Last < filters.year.minY
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        if (elem.Year <= filters.year.maxY && elem.Year >= filters.year.minY) {
          return true;
        } else {
          return false;
        }
      }
    });
  }
  if (filters[field].length === 0) return curMovies;
  return curMovies.filter(elem => {
    let fieldArr = elem[field[0].toUpperCase() + field.slice(1)]
      .toLowerCase()
      .split(',');
    let hasField =
      fieldArr
        .map(el => {
          return filters[field]
            .join(',')
            .toLowerCase()
            .includes(el.trim());
        })
        .filter(el => el === true).length === filters[field].length;

    if (hasField) return true;
    else return false;
  });
};

const filterMovies = (state, action) => {
  const filterGenre = filterBy(
    state.moviesDefault.slice(),
    'genre',
    action.filters
  );
  const filterCountry = filterBy(filterGenre, 'country', action.filters);
  const filterYear = filterBy(filterCountry, 'year', action.filters);
  const filteredMovies = filterYear;
  return {
    ...state,
    movies: filteredMovies
  };
};
/**
 * curMovies - list of movies (Array of Obj)
 * field     - string value to filter by (value from data > filters)
 */

export const movies = (state = {}, action) => {
  switch (action.type) {
    case actions.FETCH_MOVIES_START:
      return {
        ...state
      };
    case actions.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        moviesDefault: action.movies.filter(movie => {
          if (movie.Title !== undefined) return true;
          return false;
        }),
        movies: action.movies.filter(movie => {
          if (movie.Title !== undefined) return true;
          return false;
        })
      };
    case actions.FETCH_MOVIES_FAILURE:
      return {
        ...state
      };
    case actions.RESET_MOVIES:
      return {
        ...state,
        movies: state.moviesDefault.slice()
      };
    case actions.SORT_ALPHA_DESC:
      return {
        ...state,
        movies: sortAZ(0, state.movies)
      };
    case actions.SORT_ALPHA_ASC:
      return {
        ...state,
        movies: sortAZ(1, state.movies)
      };
    case actions.FILTER_MOVIES:
      return filterMovies(state, action);
    default:
      return state;
  }
};

export default { movies };
