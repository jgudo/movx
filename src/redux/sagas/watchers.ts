import * as action from '@app/constants/actionType';
import { takeEvery, takeLatest } from 'redux-saga/effects';
import { genreSaga } from './genreSaga';
import { movieSaga } from './movieSaga';
import {
  fetchRequestSaga,
  fetchSelectedPersonSaga,
  searchSaga,
  updateFilterQuerySaga
} from './rootSaga';

function* rootSaga() {
  yield takeLatest(
    [
      action.FETCH_PEOPLE,
      action.SEARCH_TV_SHOWS,
      action.SEARCH_PEOPLE,
      action.SEARCH_MOVIES,
    ],
    fetchRequestSaga,
  );

  yield takeLatest(
    [
      action.FETCH_DISCOVER_MOVIES,
      action.FETCH_TRENDING_MOVIES,
      action.FETCH_UPCOMING_MOVIES,
      action.FETCH_POPULAR_MOVIES,
      action.FETCH_TOPRATED_MOVIES,
      action.FETCH_TV_SHOWS,
      action.FETCH_MAIN_MOVIES,
      action.FETCH_SELECTED_MOVIE
    ],
    movieSaga
  );

  yield takeLatest(
    [
      action.FETCH_GENRES,
      action.FETCH_CURRENT_GENRE,
    ],
    genreSaga
  )

  yield takeEvery(
    [action.SET_GENRE_FILTER, action.SET_SORT_FILTER, action.SET_YEAR_FILTER],
    updateFilterQuerySaga,
  );

  yield takeLatest(action.SEARCH, searchSaga);
  yield takeLatest(action.FETCH_SELECTED_PERSON, fetchSelectedPersonSaga);
}

export default rootSaga;
