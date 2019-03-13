import axios from 'axios';

const tmdb = 'https://api.themoviedb.org/3/';
const tmdbKey = process.env.TMDB_KEY;

export const isCurrentlyFetching = (bool = true) => ({
  type: 'IS_LOADING',
  bool
});

export const fetchRequest = (action, query, page = 1) => {
  return (dispatch) => {
    axios.get(`${tmdb + query}&api_key=${tmdbKey}&page=${page}`)
      .then((response) => {
        const tmdbData = response.data;
        if (action === 'FETCH_GENRES') {
          dispatch({
            type: action,
            data: tmdbData.genres,
            isLoading: false,
            error: undefined
          });    
        } else {
          dispatch({
            type: action,
            data: {
              activePage: tmdbData.page,
              collection: tmdbData.results,
              total_pages: tmdbData.total_pages,
              total_results: tmdbData.total_results
            },
            isLoading: false,
            error: undefined
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: 'IS_LOADING',
          bool: false
        });
      });
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
