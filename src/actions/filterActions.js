import * as action from '../constants/constants';

export const setDiscoverYearFilter = year => ({
  type: action.SET_DISCOVER_YEAR_FILTER,
  payload: {
    year,
    target: 'discover'
  }
});

export const setTvYearFilter = year => ({
  type: action.SET_TV_YEAR_FILTER,
  payload: {
    year,
    target: 'tv'
  }
});

export const setDiscoverSortFilter = sort => ({
  type: action.SET_DISCOVER_SORT_FILTER,
  payload: {
    sort,
    target: 'discover'
  }
});

export const setTvSortFilter = sort => ({
  type: action.SET_TV_SORT_FILTER,
  payload: {
    sort,
    target: 'tv'
  }
});

export const setDiscoverGenreFilter = genre => ({
  type: action.SET_DISCOVER_GENRE_FILTER,
  payload: {
    genre,
    target: 'discover'
  }
});

export const setTvGenreFilter = genre => ({
  type: action.SET_TV_GENRE_FILTER,
  payload: {
    genre,
    target: 'tv'
  }
});