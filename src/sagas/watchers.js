import { takeLatest, takeEvery } from 'redux-saga/effects';
import * as action from 'constants/constants';

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
    action.FETCH_TRENDING_MOVIES,
    action.FETCH_DISCOVER_MOVIES,
    action.FETCH_TV_SHOWS,
    action.FETCH_PEOPLE,
    action.FETCH_GENRES,
    action.FETCH_GENRE_CATEGORY,
    action.SEARCH_TV_SHOWS,
    action.SEARCH_PEOPLE,
    action.SEARCH_MOVIES
  ], fetchRequestSaga);

  yield takeEvery([
    action.FETCH_POPULAR_MOVIES,
    action.FETCH_TOPRATED_MOVIES,
    action.FETCH_UPCOMING_MOVIES
  ], fetchRequestSaga);

  yield takeEvery([
    action.SET_DISCOVER_GENRE_FILTER,
    action.SET_DISCOVER_SORT_FILTER,
    action.SET_DISCOVER_YEAR_FILTER,
    action.SET_TV_GENRE_FILTER,
    action.SET_TV_SORT_FILTER,
    action.SET_TV_YEAR_FILTER
  ], updateFilterQuerySaga);

  yield takeLatest(action.FETCH_SELECTED_MOVIE, fetchSelectedMovieSaga);
  yield takeLatest(action.SEARCH, searchSaga);
  yield takeLatest(action.FETCH_MAIN_MOVIES, fetchMainMoviesSaga);
  yield takeLatest(action.FETCH_SELECTED_PERSON, fetchSelectedPersonSaga);
}

export default rootSaga;
