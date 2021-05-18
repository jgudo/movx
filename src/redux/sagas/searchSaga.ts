import { search } from '@app/services/api';
import { SEARCH, SEARCH_MOVIES, SEARCH_PEOPLE, SEARCH_TV_SHOWS } from '@app/constants/actionType';
import { all, call, put } from 'redux-saga/effects';
import { setLoading } from '../actions/miscActions';
import { searchMoviesSuccess, searchPeopleSuccess, searchSuccess, searchTvShowsSuccess } from '../actions/searchActions';

interface ISagaArgs {
  type: any;
  payload: any;
}

export function* searchSaga({ type, payload }: ISagaArgs): any {
  switch (type) {
    case SEARCH: {
      try {
        yield put(setLoading(true));
        const { query } = payload;
        const [tv, movies, people] = yield all([
          call(search, 'tv', query),
          call(search, 'movie', query),
          call(search, 'person', query),
        ]);

        yield put(searchSuccess({ tv, movies, people }));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case SEARCH_MOVIES: {
      try {
        yield put(setLoading(true));
        const { query, page } = payload;
        yield put(setLoading(true));

        const movies = yield call(search, 'movie', query, page);
        yield put(searchMoviesSuccess(movies));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case SEARCH_TV_SHOWS: {
      try {
        yield put(setLoading(true));
        const { query, page } = payload;
        yield put(setLoading(true));

        const tvShows = yield call(search, 'tv', query, page);
        yield put(searchTvShowsSuccess(tvShows));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case SEARCH_PEOPLE: {
      try {
        yield put(setLoading(true));
        const { query, page } = payload;
        yield put(setLoading(true));

        const people = yield call(search, 'person', query, page);
        yield put(searchPeopleSuccess(people));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    default:
      throw new Error('Unexpected action type');
  }
}
