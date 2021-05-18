import {
  FETCH_DISCOVER_MOVIES, FETCH_MAIN_MOVIES, FETCH_POPULAR_MOVIES,
  FETCH_SELECTED_MOVIE, FETCH_TOPRATED_MOVIES, FETCH_TRENDING_MOVIES,
  FETCH_TV_SHOWS, FETCH_UPCOMING_MOVIES
} from '@app/constants/actionType';
import {
  getDiscoverMovies,
  getMovieCredits,
  getMovieKeywords,
  getMovieReviews,
  getPopularMovies,
  getSelectedMovie,
  getTopRatedMovies, getTrendingMovies,
  getTvShows,
  getUpcomingMovies
} from '@app/services/api';
import { IRootState } from '@app/types/types';
import { all, call, put, select } from 'redux-saga/effects';
import { setLoading } from '../actions/miscActions';
import {
  fetchDiscoverMoviesSuccess,
  fetchMainMoviesSuccess,
  fetchPopularMoviesSuccess,
  fetchSelectedMoviesSuccess,
  fetchTopRatedMoviesSuccess,
  fetchTrendingMoviesSuccess,
  fetchTVShowSuccess,
  fetchUpcomingMoviesSuccess
} from '../actions/movieActions';

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
        const filter = yield select((state: IRootState) => state.filters.discover);

        yield put(setLoading(true));
        const movies = yield call(getDiscoverMovies, filter, payload.page);
        yield put(fetchDiscoverMoviesSuccess(movies));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case FETCH_UPCOMING_MOVIES: {
      try {
        yield put(setLoading(true));

        const movies = yield call(getUpcomingMovies, payload.page);
        yield put(fetchUpcomingMoviesSuccess(movies));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case FETCH_POPULAR_MOVIES: {
      try {
        yield put(setLoading(true));

        const movies = yield call(getPopularMovies, payload.page);
        yield put(fetchPopularMoviesSuccess(movies));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case FETCH_TOPRATED_MOVIES: {
      try {
        yield put(setLoading(true));

        const movies = yield call(getTopRatedMovies, payload.page);
        yield put(fetchTopRatedMoviesSuccess(movies));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case FETCH_TV_SHOWS: {
      try {
        const filter = yield select((state: IRootState) => state.filters.tv);
        yield put(setLoading(true));

        const tvShows = yield call(getTvShows, filter, payload.page);
        yield put(fetchTVShowSuccess(tvShows));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case FETCH_MAIN_MOVIES: {
      try {
        yield put(setLoading(true));
        const [popular, topRated, upcoming] = yield all([
          call(getPopularMovies, 1),
          call(getTopRatedMovies, 1),
          call(getUpcomingMovies, 1),
        ]);

        yield put(fetchMainMoviesSuccess({ popular, topRated, upcoming }))
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case FETCH_SELECTED_MOVIE: {
      try {
        yield put(setLoading(true));
        const { mediaType, id } = payload;
        const [movie, keywords, casts, reviews] = yield all([
          call(getSelectedMovie, mediaType, id),
          call(getMovieKeywords, mediaType, id),
          call(getMovieCredits, mediaType, id),
          call(getMovieReviews, mediaType, id),
        ]);

        yield put(fetchSelectedMoviesSuccess({
          movie,
          keywords: keywords.keywords,
          casts: casts.cast,
          reviews: reviews.results
        }))
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
