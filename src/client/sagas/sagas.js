import { 
  call, 
  put,  
  select,
  all
} from 'redux-saga/effects';
import { history } from '../routers/AppRouter';

import { 
  IS_LOADING, 
  UPDATE_DISCOVER_QUERY, 
  UPDATE_TV_QUERY,
  FETCH_SELECTED_PERSON_SUCCESS,
  FETCH_SELECTED_MOVIE_SUCCESS,
  FETCH_MAIN_MOVIES_SUCCESS,
  SEARCH_SUCCESS,
  UPDATE_SEARCH_QUERY
} from '../constants/constants';
import { 
  fetchRequest,
  fetchMovie,
  fetchMovieCredits,
  fetchMovieKeywords,
  fetchMovieReviews,
  fetchPerson,
  fetchPersonCasting,
  searchMovie,
  searchTv,
  searchPerson
} from '../api/api';

function updateQuery(year, sort, genre) {
  const yearFilter = year ? `&year=${year}&first_air_date_year=${year}` : '';
  const sortFilter = sort ? `&sort_by=${sort}` : '';
  const genreFilter = genre ? `&with_genres=${genre}` : '';
  return `${yearFilter + sortFilter + genreFilter}`;
}

function* errorHandler(e) {
  console.log(e);
  yield put({ type: IS_LOADING, bool: false });

  if (!navigator.onLine) {
    yield call(history.push, '/network-error');
  } else {
    yield call(history.push, '/error');
  } 
}

export function* fetchRequestSaga({ type, query, page }) {
  try {
    yield put({ type: IS_LOADING, bool: true });
    const data = yield call(fetchRequest, query, page);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      window.scrollTo(null, 0);
    }
  } catch (e) {
    yield call(errorHandler, e);
  }
}

export function* updateFilterQuerySaga({ target }) {
  try {
    const state = yield select();
    const { year, sort, genre } = state.filter[target];

    if (target === 'discover') {
      const query = updateQuery(year, sort, genre);
      yield put({ type: UPDATE_DISCOVER_QUERY, query });
    } else if (target === 'tv') {
      const query = updateQuery(year, sort, genre);
      yield put({ type: UPDATE_TV_QUERY, query });
    }
  } catch (e) {
    console.log(e);
    yield put({ type: IS_LOADING, bool: false });
  }
}

export function* fetchSelectedMovieSaga({ category, id }) {
  try {
    yield put({ type: IS_LOADING, bool: true });
    const [movie, keywords, casts, reviews] = yield all([
      call(fetchMovie, category, id),
      call(fetchMovieKeywords, category, id),
      call(fetchMovieCredits, category, id),
      call(fetchMovieReviews, category, id)
    ]);

    yield put({ 
      type: FETCH_SELECTED_MOVIE_SUCCESS, 
      data: { 
        movie, 
        keywords, 
        casts, 
        reviews 
      } 
    });
    window.scrollTo(null, 0);
  } catch (e) {
    yield call(errorHandler, e);
  }
} 

// Fetching movies, tv-shows, and people all together
export function* searchSaga({ query }) {
  try {
    yield put({ type: IS_LOADING, bool: true });
    const [tv, movies, people] = yield all([
      call(searchTv, query),
      call(searchMovie, query),
      call(searchPerson, query)
    ]);

    yield put({ 
      type: SEARCH_SUCCESS, 
      data: { 
        movies, 
        tv, 
        people 
      } 
    });
    yield put({ type: UPDATE_SEARCH_QUERY, query });
    window.scrollTo(null, 0);
  } catch (e) {
    yield call(errorHandler, e);
  }
}

// Fetching popular, top-rated, and upcoming movies for home page
export function* fetchMainMoviesSaga() {
  try {
    yield put({ type: IS_LOADING, bool: true });
    const [popular, topRated, upcoming] = yield all([
      call(fetchRequest, 'movie/popular?', 1),
      call(fetchRequest, 'movie/top_rated?', 1),
      call(fetchRequest, 'movie/upcoming?', 1)
    ]);

    yield put({ 
      type: FETCH_MAIN_MOVIES_SUCCESS, 
      data: { 
        popular, 
        topRated, 
        upcoming 
      } 
    });
    window.scrollTo(null, 0);
  } catch (e) {
    yield call(errorHandler, e);
  }
}

export function* fetchSelectedPersonSaga({ id }) {
  try {
    yield put({ type: IS_LOADING, bool: true });
    const [actor, casting] = yield all([
      call(fetchPerson, id),
      call(fetchPersonCasting, id)
    ]);

    yield put({ type: FETCH_SELECTED_PERSON_SUCCESS, actor, casting });
    window.scrollTo(null, 0);
  } catch (e) {
    yield call(errorHandler, e);
  }
}
