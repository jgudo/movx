import axios from 'axios';

export const fetchMovies = (url, page = 1) => {
  return (dispatch) => {
    axios.get(`${url}&page=${page}`)
      .then((response) => {
        const movie = response.data;
        dispatch({
          type: 'FETCH_TRENDING_MOVIES',
          movies: {
            activePage: movie.page,
            collection: movie.results,
            total_pages: movie.total_pages,
            total_results: movie.total_results
          },
          isLoading: false
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState(() => ({ isLoading: false }));
      });
  }; 
};

export const isCurrentlyFetching = (bool = true) => ({
  type: 'IS_LOADING',
  bool
});
