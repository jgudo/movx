const moviesReducer = (state = {
  trendingMovies: {},
  discoverMovies: {},
  tvShows: {},
  isLoading: true
}, action) => {
  switch (action.type) {
    case 'FETCH_TRENDING_MOVIES':
      return {
        ...state,
        trendingMovies: { ...action.movies },
        isLoading: false
      };
    case 'FETCH_DISCOVER_MOVIES':
      return {
        ...state,
        discoverMovies: { ...action.movies },
        isLoading: false
      };
    case 'FETCH_TV_SHOWS':
      return {
        ...state,
        tvShows: { ...action.movies },
        isLoading: false
      };    
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.bool
      };
    default: 
      return state;
  }
};

export default moviesReducer;
