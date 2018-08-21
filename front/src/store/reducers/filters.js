import actions from '../actionsTypes';

const initialState = {
  genre: [],
  country: [],
  year: {
    minY: 1900,
    maxY: 2018
  },
  toggleFilters: false
};

const clearFilters = state => {
  return {
    ...state,
    country: [],
    genre: [],
    year: {
      minY: 1900,
      maxY: 2018
    }
  };
};

const filtersHandler = (state, action) => {
  // console.log(action);
  let newArr = [];
  if (state[action.filter]) {
    newArr = [...state[action.filter]];
  } else {
    newArr = [];
  }
  if (newArr.includes(action.value)) {
    newArr.splice(newArr.indexOf(action.value), 1);
  } else {
    newArr.push(action.value);
  }
  // console.log('Checkboxes', newArr);
  // console.log({
  //   ...state,
  //   [action.filter]: newArr
  // });
  return {
    ...state,
    [action.filter]: newArr
  };
};

const rangeHandler = (state, action) => {
  // console.log(action);
  return {
    ...state,
    year: {
      ...state.year,
      [action.year]: action.val
    }
  };
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_FILTERS_PANEL:
      return {
        ...state,
        toggleFilters: state.toggleFilters ? false : true
      };
    case actions.CLEAR_FILTERS:
      return clearFilters(state, action);
    case actions.HANDLE_FILTERS_INPUT:
      return filtersHandler(state, action);
    case actions.HANDLE_RANGE_INPUT:
      return rangeHandler(state, action);
    default:
      return state;
  }
};

export default filters;
