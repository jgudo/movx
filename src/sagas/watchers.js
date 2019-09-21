import { takeLatest, takeEvery } from 'redux-saga/effects';
import { 
  FETCH_TRENDING_MOVIES,
  FETCH_DISCOVER_MOVIES,
  FETCH_TV_SHOWS,
  FETCH_PEOPLE, 
  FETCH_POPULAR_MOVIES,
  FETCH_TOPRATED_MOVIES,
  FETCH_UPCOMING_MOVIES,
  FETCH_MAIN_MOVIES,
  FETCH_GENRES,
  SEARCH,
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
  FETCH_SELECTED_MOVIE,
  FETCH_SELECTED_PERSON
} from '../constants/constants';

import { 
  fetchRequestSaga, 
  updateFilterQuerySaga, 
  fetchSelectedMovieSaga, 
  fetchSelectedPersonSaga,
  fetchMainMoviesSaga,
  searchSaga 
} from './sagas';

function* rootSaga() {
  yield takeLatest([
    FETCH_TRENDING_MOVIES,
    FETCH_DISCOVER_MOVIES,
    FETCH_TV_SHOWS,
    FETCH_PEOPLE,
    FETCH_GENRES,
    FETCH_GENRE_CATEGORY,
    SEARCH_TV_SHOWS,
    SEARCH_PEOPLE,
    SEARCH_MOVIES
  ], fetchRequestSaga);

  yield takeEvery([
    FETCH_POPULAR_MOVIES,
    FETCH_TOPRATED_MOVIES,
    FETCH_UPCOMING_MOVIES
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
  yield takeLatest(SEARCH, searchSaga);
  yield takeLatest(FETCH_MAIN_MOVIES, fetchMainMoviesSaga);
  yield takeLatest(FETCH_SELECTED_PERSON, fetchSelectedPersonSaga);
}

export default rootSaga;
