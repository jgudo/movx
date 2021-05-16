import { getDiscoverMovies, getTrendingMovies } from '@app/api/api';
import { FETCH_DISCOVER_MOVIES, FETCH_TRENDING_MOVIES } from '@app/constants/actionType';
import { call, put } from 'redux-saga/effects';
import { setLoading } from '../actions/miscActions';
import { fetchDiscoverMoviesSuccess, fetchTrendingMoviesSuccess } from '../actions/movieActions';

interface ISagaArgs {
  type: any;
  payload: any;
}

export function* movieSaga({ type, payload }: ISagaArgs): any {
  switch (type) {
    case FETCH_TRENDING_MOVIES: {
      try {
        yield put(setLoading(true));

        const movies = yield call(getTrendingMovies, payload.page);
        yield put(fetchTrendingMoviesSuccess(movies));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case FETCH_DISCOVER_MOVIES: {
      try {
        yield put(setLoading(true));

        const movies = yield call(getDiscoverMovies, payload.query, payload.page);
        yield put(fetchDiscoverMoviesSuccess(movies));
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
