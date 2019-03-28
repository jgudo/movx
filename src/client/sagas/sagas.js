import { 
  call, 
  put, 
  take, 
  select,
  all,
  delay 
} from 'redux-saga/effects';

import { 
  IS_LOADING, 
  UPDATE_DISCOVER_QUERY, 
  UPDATE_TV_QUERY
} from '../constants/constants';
import { 
  fetchRequest,
  fetchMovie,
  fetchMovieCredits,
  fetchMovieKeywords,
  fetchMovieReviews
} from '../api/api';

export function* fetchRequestSaga({ type, query, page }) {
  try {
    console.log(type, query, page);
    const data = yield call(fetchRequest, query, page);
    if (data) {
      console.log(data);
      yield put({ type: `${type}_SUCCESS`, data });
      window.scrollTo(null, 0);
    }
  } catch (e) {
    if (e) console.log(e);
    yield put({ type: IS_LOADING, bool: false});
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
      yield put({ type: UPDATE_DISCOVER_QUERY, query: updateQuery(year, sort, genre) });
    } else if (target === 'tv') {
      const { year, sort, genre } = state.filter.tv;
      yield put({ type: UPDATE_TV_QUERY, query: updateQuery(year, sort, genre) });
    }
  } catch (e) {
    console.log(e);
  }
}

export function* fetchSelectedMovieSaga({ category, id }) {
  try {
    console.log(category, id);
  } catch (e) {

  }
} 
