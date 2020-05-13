import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from 'components/hoc/Loader';  
import MovieList from 'components/movies/MovieList';
import Container from 'components/common/Container';
import PaginationBar from 'components/common/PaginationBar';
import { fetchTopRatedMovies } from 'actions/movieActions';
import { isEmpty, numberWithCommas } from 'helpers/helperFunctions';

const TopRatedMovies = (props) => {
  const { topRatedMovies, isLoading, favorites } = useSelector(state => ({
    topRatedMovies: state._movies.topRatedMovies,
    isLoading: state._misc.isLoading,
    favorites: state._misc.favorites
  }));
  const dispatch = useDispatch();
  const queryString = '/movie/top_rated';
  
  useEffect(() => {
    if (isEmpty(topRatedMovies)) {
      dispatch(fetchTopRatedMovies(queryString));
    }
  }, []);
 
  const handlePageChange = (page) => {
    if (topRatedMovies.page !== page && !isLoading) {
      dispatch(fetchTopRatedMovies(queryString, page));
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Top Rated Movies</h1>
          <h3>{numberWithCommas(topRatedMovies.total_results)} Movies</h3>
        </div>
      </div>
      <MovieList 
          movies={topRatedMovies.results} 
          favorites={favorites}
          templateCount={10} 
      />
      <PaginationBar 
          activePage={topRatedMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={topRatedMovies.total_pages}
          totalPage={topRatedMovies.total_pages}
      />
    </Container>
  );
};

export default Loader('topRatedMovies')(TopRatedMovies);
