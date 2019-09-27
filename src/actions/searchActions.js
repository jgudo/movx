import * as action from 'constants/constants';

export const search = query => ({
  type: action.SEARCH,
  payload: {
    query
  }
});

export const searchTvShows = (query, page = 1) => ({
  type: action.SEARCH_TV_SHOWS,
  payload: {
    query,
    page
  }
});

export const searchPeople = (query, page = 1) => ({
  type: action.SEARCH_PEOPLE,
  payload: {
    query,
    page
  }
});

export const searchMovies = (query, page = 1) => ({
  type: action.SEARCH_MOVIES,
  payload: {
    query,
    page
  }
});

export const updateSearchQuery = query => ({
  type: action.UPDATE_SEARCH_QUERY,
  payload: {
    query
  }
});

export const addSearchHistory = search => ({
  type: action.ADD_SEARCH_HISTORY,
  payload: search
});

export const clearSearchHistory = () => ({
  type: action.CLEAR_SEARCH_HISTORY
});
