const moviesReducer = (state = {
  trendingMovies: {},
  isLoading: true
}, action) => {
  switch (action.type) {
    case 'FETCH_TRENDING_MOVIES':
      return {
        ...state,
        trendingMovies: { ...action.movies },
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
