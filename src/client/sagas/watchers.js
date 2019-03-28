import { takeLatest, takeEvery } from 'redux-saga/effects';
import { 
  FETCH_TRENDING_MOVIES,
  FETCH_DISCOVER_MOVIES,
  FETCH_TV_SHOWS,
  FETCH_PEOPLE, 
  FETCH_POPULAR_MOVIES,
  FETCH_TOPRATED_MOVIES,
  FETCH_UPCOMING_MOVIES,
  FETCH_GENRES,
  SEARCH_TV_SHOWS,
  SEARCH_PEOPLE,
  SEARCH_MOVIES,
  FETCH_GENRE_CATEGORY,
  SET_DISCOVER_GENRE_FILTER,
  SET_DISCOVER_SORT_FILTER,
  SET_DISCOVER_YEAR_FILTER,
  SET_TV_GENRE_FILTER,
  SET_TV_SORT_FILTER,
  SET_TV_YEAR_FILTER,
  FETCH_SELECTED_MOVIE
} from '../constants/constants';

import { fetchRequestSaga, updateFilterQuerySaga, fetchSelectedMovieSaga } from './sagas';

function* rootSaga() {
  yield takeLatest([
    FETCH_TRENDING_MOVIES,
    FETCH_DISCOVER_MOVIES,
    FETCH_TV_SHOWS,
    FETCH_PEOPLE,
    FETCH_POPULAR_MOVIES,
    FETCH_TOPRATED_MOVIES,
    FETCH_UPCOMING_MOVIES,
    FETCH_GENRES,
    FETCH_GENRE_CATEGORY
  ], fetchRequestSaga);

  yield takeEvery([
    SEARCH_TV_SHOWS,
    SEARCH_PEOPLE,
    SEARCH_MOVIES
  ], fetchRequestSaga);

  yield takeEvery([
    SET_DISCOVER_GENRE_FILTER,
    SET_DISCOVER_SORT_FILTER,
    SET_DISCOVER_YEAR_FILTER,
    SET_TV_GENRE_FILTER,
    SET_TV_SORT_FILTER,
    SET_TV_YEAR_FILTER
  ], updateFilterQuerySaga);

  yield takeLatest(FETCH_SELECTED_MOVIE, fetchSelectedMovieSaga);
}

export default rootSaga;
