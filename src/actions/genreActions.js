import { FETCH_GENRES, FETCH_GENRE_CATEGORY } from '../constants/constants';

export const fetchGenres = (query, page = 1) => ({
  type: FETCH_GENRES,
  payload: {
    query,
    page
  }
});

export const fetchGenreCategory = (query, page = 1) => ({
  type: FETCH_GENRE_CATEGORY,
  payload: {
    query,
    page
  }
});
