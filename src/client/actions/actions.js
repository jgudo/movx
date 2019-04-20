import { 
  IS_LOADING,
  ADD_SEARCH_HISTORY,
  CLEAR_SEARCH_HISTORY,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  FETCH_SELECTED_MOVIE,
  FETCH_TRENDING_MOVIES,
  FETCH_TV_SHOWS,
  FETCH_DISCOVER_MOVIES,
  FETCH_SELECTED_PERSON, 
  FETCH_PEOPLE,
  FETCH_POPULAR_MOVIES,
  FETCH_TOPRATED_MOVIES,
  FETCH_UPCOMING_MOVIES,
  FETCH_GENRES,
  SEARCH_TV_SHOWS,
  SEARCH_PEOPLE,
  SEARCH_MOVIES,
  UPDATE_SEARCH_QUERY,
  FETCH_GENRE_CATEGORY,
  SET_DISCOVER_YEAR_FILTER,
  SET_TV_YEAR_FILTER,
  SET_DISCOVER_SORT_FILTER,
  SET_TV_SORT_FILTER,
  SET_DISCOVER_GENRE_FILTER,
  SET_TV_GENRE_FILTER,
  SEARCH,
  FETCH_MAIN_MOVIES
} from '../constants/constants';

export const fetchTrendingMovies = (query, page = 1) => ({
  type: FETCH_TRENDING_MOVIES,
  query,
  page
});

export const fetchDiscoverMovies = (query, page = 1) => ({
  type: FETCH_DISCOVER_MOVIES,
  query,
  page
});

export const fetchTvShows = (query, page = 1) => ({
  type: FETCH_TV_SHOWS,
  query,
  page
});

export const fetchPeople = (query, page = 1) => ({
  type: FETCH_PEOPLE,
  query,
  page
});

export const fetchPopularMovies = (query, page = 1) => ({
  type: FETCH_POPULAR_MOVIES,
  query,
  page
});

export const fetchTopRatedMovies = (query, page = 1) => ({
  type: FETCH_TOPRATED_MOVIES,
  query,
  page
});

export const fetchUpcomingMovies = (query, page = 1) => ({
  type: FETCH_UPCOMING_MOVIES,
  query,
  page
});

export const fetchGenres = (query, page = 1) => ({
  type: FETCH_GENRES,
  query,
  page
});


export const fetchGenreCategory = (query, page = 1) => ({
  type: FETCH_GENRE_CATEGORY,
  query,
  page
});

export const fetchMainMovies = () => ({
  type: FETCH_MAIN_MOVIES
});

export const search = query => ({
  type: SEARCH,
  query
});

export const searchTvShows = (query, page = 1) => ({
  type: SEARCH_TV_SHOWS,
  query,
  page
});

export const searchPeople = (query, page = 1) => ({
  type: SEARCH_PEOPLE,
  query,
  page
});

export const searchMovies = (query, page = 1) => ({
  type: SEARCH_MOVIES,
  query,
  page
});

export const updateSearchQuery = query => ({
  type: UPDATE_SEARCH_QUERY,
  query
});

export const fetchSelectedMovie = (category, id) => ({
  type: FETCH_SELECTED_MOVIE,
  category,
  id
});

export const fetchSelectedPerson = id => ({
  type: FETCH_SELECTED_PERSON,
  id
});

export const isCurrentlyFetching = (bool = true) => ({
  type: IS_LOADING,
  bool
});

export const setDiscoverYearFilter = year => ({
  type: SET_DISCOVER_YEAR_FILTER,
  year,
  target: 'discover'
});

export const setTvYearFilter = year => ({
  type: SET_TV_YEAR_FILTER,
  year,
  target: 'tv'
});

export const setDiscoverSortFilter = sort => ({
  type: SET_DISCOVER_SORT_FILTER,
  sort,
  target: 'discover'
});

export const setTvSortFilter = sort => ({
  type: SET_TV_SORT_FILTER,
  sort,
  target: 'tv'
});

export const setDiscoverGenreFilter = genre => ({
  type: SET_DISCOVER_GENRE_FILTER,
  genre,
  target: 'discover'
});

export const setTvGenreFilter = genre => ({
  type: SET_TV_GENRE_FILTER,
  genre,
  target: 'tv'
});
 
export const addSearchHistory = search => ({
  type: ADD_SEARCH_HISTORY,
  search
});

export const clearSearchHistory = () => ({
  type: CLEAR_SEARCH_HISTORY
});

export const addToFavorites = favorites => ({
  type: ADD_TO_FAVORITES,
  favorites
});

export const removeFromFavorites = id => ({
  type: REMOVE_FROM_FAVORITES,
  id
});
