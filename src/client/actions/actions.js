import axios from 'axios';

const tmdb = 'https://api.themoviedb.org/3/';
const tmdbKey = process.env.TMDB_KEY;

export const isCurrentlyFetching = (bool = true) => ({
  type: 'IS_LOADING',
  bool
});

export const fetchRequest = (action, query, page = 1) => {
  let response;
  return async (dispatch) => {
    try {
      const request = await axios.get(`${tmdb + query}&api_key=${tmdbKey}&page=${page}`);
      const tmdbData = await request.data;

      if (tmdbData) {
        dispatch({
          type: action,
          data: tmdbData,
          isLoading: false,
          error: undefined
        });
        window.scrollTo(null, 0);
      }
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: 'IS_LOADING',
        bool: false
      });
    }  
    return Promise.resolve(response); 
  };
};

export const fetchSelected = (category, movieId) => {
  let response;
  return async (dispatch) => {
    try {
      const movieRequest = await axios.get(`${tmdb + category}/${movieId}?api_key=${tmdbKey}&append_to_response=videos`);
      const movie = await movieRequest.data;
      const creditsRequest = await axios.get(`${tmdb + category}/${movie.id}/credits?api_key=${tmdbKey}`);
      const credits = await creditsRequest.data;
      const keywordsRequest = await axios.get(`${tmdb + category}/${movie.id}/keywords?api_key=${tmdbKey}`);
      const keywords = await keywordsRequest.data;

      if (movie) {
        dispatch({
          type: 'FETCH_SELECTED_MOVIE',
          data: {
            movie,
            keywords: keywords.keywords,
            casts: credits.cast
          },
          isLoading: false
        });  
      }
    } catch (e) {
      response = e.response.status;
      dispatch({
        type: 'IS_LOADING',
        bool: false
      });
    }
    return Promise.resolve(response);
  };
};

export const fetchPerson = (id) => {
  let response;
  return async (dispatch) => {
    try {
      const personRequest = await axios.get(`${tmdb}person/${id}?api_key=${tmdbKey}`);
      const person = await personRequest.data;

      if (person) {
        dispatch({
          type: 'FETCH_SELECTED_PERSON',
          data: person,
          isLoading: false
        });  
      }
    } catch (e) {
      response = e.response.status;
      dispatch({
        type: 'IS_LOADING',
        bool: false
      });
    }
    return Promise.resolve(response); 
  };
};

export const setYearFilter = (action, year) => (dispatch, getState) => {
  dispatch({
    type: action,
    year
  });
  return Promise.resolve(getState());
};

export const setSortFilter = (action, sort) => (dispatch, getState) => {
  dispatch({
    type: action,
    sort
  });
  return Promise.resolve(getState());
};

export const setGenreFilter = (action, genre) => (dispatch, getState) => {
  dispatch({
    type: action,
    genre
  });
  return Promise.resolve(getState());
}; 

export const updateQuery = (action, query) => ({
  type: action,
  query
});

export const addSearchHistory = search => ({
  type: 'ADD_SEARCH_HISTORY',
  search
});

export const clearSearchHistory = () => ({
  type: 'CLEAR_SEARCH_HISTORY'
});

export const addToFavorites = favorites => ({
  type: 'ADD_TO_FAVORITES',
  favorites
});

export const removeFromFavorites = id => ({
  type: 'REMOVE_FROM_FAVORITES',
  id
});
