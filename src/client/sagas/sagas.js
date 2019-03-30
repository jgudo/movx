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
  FETCH_SELECTED_MOVIE_SUCCESS
} from '../constants/constants';
import { 
  fetchRequest,
  fetchMovie,
  fetchMovieCredits,
  fetchMovieKeywords,
  fetchMovieReviews,
  fetchPerson,
  fetchPersonCasting
} from '../api/api';

export function* fetchRequestSaga({ type, query, page }) {
  try {
    const data = yield call(fetchRequest, query, page);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      window.scrollTo(null, 0);
    }
  } catch (e) {
    console.dir(e.message);
    yield put({ type: IS_LOADING, bool: false});
    if (!navigator.onLine) yield call(history.push, '/network-error');
    else yield call(history.push, '/error');
  }
}

const updateQuery = (year, sort, genre) => {
  const yearFilter = year ? `&year=${year}&first_air_date_year=${year}` : '';
  const sortFilter = sort ? `&sort_by=${sort}` : '';
  const genreFilter = genre ? `&with_genres=${genre}` : '';
  return `${yearFilter + sortFilter + genreFilter}`;
};

export function* updateFilterQuerySaga({ target }) {
  try {
    const state = yield select();
    
    if (target === 'discover') {
      const { year, sort, genre } = state.filter.discover;
      const query = updateQuery(year, sort, genre);
      yield put({ type: UPDATE_DISCOVER_QUERY, query });
    } else if (target === 'tv') {
      const { year, sort, genre } = state.filter.tv;
      const query = updateQuery(year, sort, genre);
      yield put({ type: UPDATE_TV_QUERY, query });
    }
  } catch (e) {
    console.log(e);
    yield put({ type: IS_LOADING, bool: false});
  }
}

export function* fetchSelectedMovieSaga({ category, id }) {
  try {
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
    console.log(e);
    yield put({ type: IS_LOADING, bool: false});
    if (!navigator.onLine) yield call(history.push, '/network-error');
    else yield call(history.push, '/error');
  }
} 

export function* fetchSelectedPersonSaga({ id }) {
  try {
    const [actor, casting] = yield all([
      call(fetchPerson, id),
      call(fetchPersonCasting, id)
    ]);

    yield put({ type: FETCH_SELECTED_PERSON_SUCCESS, actor, casting });
    window.scrollTo(null, 0);
  } catch (e) {
    console.log(e);
    yield put({ type: IS_LOADING, bool: false});
    if (!navigator.onLine) yield call(history.push, '/network-error');
    else yield call(history.push, '/error');
  }
}
