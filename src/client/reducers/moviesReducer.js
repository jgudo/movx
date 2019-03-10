const moviesReducer = (state = {
  trendingMovies: {},
  discoverMovies: {},
  tvShows: {},
  people: {},
  isLoading: true
}, action) => {
  switch (action.type) {
    case 'FETCH_TRENDING_MOVIES':
      return {
        ...state,
        trendingMovies: { ...action.data },
        isLoading: false
      };
    case 'FETCH_DISCOVER_MOVIES':
      return {
        ...state,
        discoverMovies: { ...action.data },
        isLoading: false
      };
    case 'FETCH_TV_SHOWS':
      return {
        ...state,
        tvShows: { ...action.data },
        isLoading: false
      };
    case 'FETCH_PEOPLE':
      return {
        ...state,
        people: { ...action.data },
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
