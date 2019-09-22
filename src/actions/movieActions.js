import * as action from '../constants/constants';

export const fetchTrendingMovies = (query, page = 1) => ({
  type: action.FETCH_TRENDING_MOVIES,
  payload: {
    query,
    page
  }
});

export const fetchDiscoverMovies = (query, page = 1) => ({
  type: action.FETCH_DISCOVER_MOVIES,
  payload: {
    query,
    page
  }
});

export const fetchTvShows = (query, page = 1) => ({
  type: action.FETCH_TV_SHOWS,
  payload: {
    query,
    page
  }
});

export const fetchPopularMovies = (query, page = 1) => ({
  type: action.FETCH_POPULAR_MOVIES,
  payload: {
    query,
    page
  }
});

export const fetchTopRatedMovies = (query, page = 1) => ({
  type: action.FETCH_TOPRATED_MOVIES,
  payload: {
    query,
    page
  }
});

export const fetchUpcomingMovies = (query, page = 1) => ({
  type: action.FETCH_UPCOMING_MOVIES,
  payload: {
    query,
    page
  }
});

export const fetchMainMovies = () => ({
  type: action.FETCH_MAIN_MOVIES
});


export const fetchSelectedMovie = (category, id) => ({
  type: action.FETCH_SELECTED_MOVIE,
  payload: {
    category,
    id
  }
});

