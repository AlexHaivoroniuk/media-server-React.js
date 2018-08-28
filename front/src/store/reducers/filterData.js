import actions from '../actionsTypes';

const initialState = {
  genres: [],
  countries: []
};

export const filterData = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_FILTER_DATA_SUCCESS:
      return {
        ...state,
        genres: action.filterData.genres,
        countries: action.filterData.countries
      };
    default:
      return state;
  }
};

export default filterData;
