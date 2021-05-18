import * as action from '@app/constants/actionType';
import { takeLatest } from 'redux-saga/effects';
import { genreSaga } from './genreSaga';
import { movieSaga } from './movieSaga';
import { peopleSaga } from './peopleSaga';
import { searchSaga } from './searchSaga';

function* rootSaga() {
  yield takeLatest(
    [
      action.FETCH_PEOPLE,
      action.FETCH_SELECTED_PERSON
    ],
    peopleSaga,
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
      action.SEARCH,
      action.SEARCH_MOVIES,
      action.SEARCH_TV_SHOWS,
      action.SEARCH_PEOPLE,
    ],
    searchSaga
  );

  yield takeLatest(
    [
      action.FETCH_GENRES,
      action.FETCH_CURRENT_GENRE,
    ],
    genreSaga
  )
}

export default rootSaga;
