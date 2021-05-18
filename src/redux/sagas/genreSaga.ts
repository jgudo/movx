import { getGenres, getSelectedGenre } from '@app/services/api';
import { FETCH_CURRENT_GENRE, FETCH_GENRES } from '@app/constants/actionType';
import { call, put } from 'redux-saga/effects';
import { fetchGenreCategorySuccess, fetchGenresSuccess } from '../actions/genreActions';
import { setLoading } from '../actions/miscActions';

interface ISagaArgs {
  type: any;
  payload: any;
}

export function* genreSaga({ type, payload }: ISagaArgs): any {
  switch (type) {
    case FETCH_GENRES: {
      try {
        yield put(setLoading(true));

        const genres = yield call(getGenres);
        yield put(fetchGenresSuccess(genres));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case FETCH_CURRENT_GENRE: {
      try {
        yield put(setLoading(true));

        const movies = yield call(getSelectedGenre, payload.genreId, payload.page);
        yield put(fetchGenreCategorySuccess(movies));
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
