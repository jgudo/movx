import axios from 'axios';
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
  SET_TV_GENRE_FILTER
} from '../constants/constants';

const tmdb = 'https://api.themoviedb.org/3/';
const tmdbKey = process.env.TMDB_KEY;

export const fetchTrendingMovies = (query, page) => ({
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

// export const fetchSelected = (category, movieId) => {
//   let response;
//   return async (dispatch) => {
//     try {
//       const movieRequest = await axios.get(`${tmdb + category}/${movieId}?api_key=${tmdbKey}&append_to_response=similar,videos,images`);
//       const movie = await movieRequest.data;
//       const creditsRequest = await axios.get(`${tmdb + category}/${movie.id}/credits?api_key=${tmdbKey}`);
//       const credits = await creditsRequest.data;
//       const keywordsRequest = await axios.get(`${tmdb + category}/${movie.id}/keywords?api_key=${tmdbKey}`);
//       const keywords = await keywordsRequest.data;
//       const reviewsRequest = await axios.get(`${tmdb + category}/${movieId}/reviews?api_key=${tmdbKey}`);
//       const reviews = await reviewsRequest.data;
      
//       if (movie) {
//         dispatch({
//           type: FETCH_SELECTED_MOVIE,
//           data: {
//             movie,
//             keywords: keywords.keywords,
//             casts: credits.cast,
//             reviews
//           }
//         });  
//       }
//       response = movieRequest.status;
//     } catch (err) {
//       if (!navigator.onLine) response = 503;
//       else response = err.response.status;
    
//       dispatch({
//         type: IS_LOADING,
//         bool: false
//       });
//     }
//     return Promise.resolve(response);
//   };
// };

export const fetchPerson = (id) => {
  let response;
  return async (dispatch) => {
    try {
      const personRequest = await axios.get(`${tmdb}person/${id}?api_key=${tmdbKey}&append_to_response=images`);
      const actor = await personRequest.data;
      const castingRequest = await axios.get(`${tmdb}person/${id}/combined_credits?api_key=${tmdbKey}`);
      const casting = await castingRequest.data;

      if (actor) {
        dispatch({
          type: FETCH_SELECTED_PERSON,
          actor,
          casting: casting.cast
        });  
      }
      response = personRequest.status;
    } catch (err) {
      if (!navigator.onLine) response = 503;
      else response = err.reponse.status;

      dispatch({
        type: IS_LOADING,
        bool: false
      });
    }
    return Promise.resolve(response); 
  };
};

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
