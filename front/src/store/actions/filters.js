import actions from '../actionsTypes';

export const toggleFiltersPanel = data => ({
  type: actions.TOGGLE_FILTERS_PANEL
});

export const clearFilters = data => (dispatch, getState) => {
  dispatch({ type: actions.CLEAR_FILTERS });
  dispatch({ type: actions.RESET_MOVIES });
};

export const handleFiltersInput = (event, filter) => ({
  type: actions.HANDLE_FILTERS_INPUT,
  e: event,
  filter: filter
});
export const handleRangeInput = (val, year) => ({
  type: actions.HANDLE_RANGE_INPUT,
  val,
  year: year
});
