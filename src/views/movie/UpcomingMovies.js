import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from 'components/hoc/Loader';  
import MovieCard from 'components/movies/MovieCard';
import Container from 'components/common/Container';
import PaginationBar from 'components/common/PaginationBar';
import { fetchUpcomingMovies } from 'actions/movieActions';
import { isEmpty, numberWithCommas } from 'helpers/helperFunctions';

const UpcomingMovies = (props) => {
  const { upcomingMovies, isLoading, favorites } = useSelector(state => ({
    upcomingMovies: state._movies.upcomingMovies,
    isLoading: state._misc.isLoading,
    favorites: state._misc.favorites
  }));
  const dispatch = useDispatch();
  const queryString = '/movie/upcoming';

  useEffect(() => {
    if (isEmpty(upcomingMovies)) {
      dispatch(fetchUpcomingMovies(queryString));
    }
  }, []);

  const handlePageChange = (page) => {
    if (upcomingMovies.page !== page && !isLoading) {
      dispatch(fetchUpcomingMovies(queryString, page));
    }
  };
 
  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Upcoming Movies</h1>
          <h3>{numberWithCommas(upcomingMovies.total_results)} Movies</h3>
        </div>
      </div>
      <div className="movie__wrapper">
        {upcomingMovies.results ? upcomingMovies.results.map((movie, index) => (
          <MovieCard 
              category="movie"
              key={`${movie.id}_${index}`}
              movie={movie} 
              favorites={favorites}
          />
        )) : new Array(10).fill({}).map((item, index) => (
          <MovieCard 
              category="movie"
              key={`skeleton_upcoming_${index}`}
              movie={{}} 
              favorites={[]}
          />
        ))}
      </div>
      <PaginationBar 
          activePage={upcomingMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={upcomingMovies.total_pages}
          totalPage={upcomingMovies.total_pages}
      />
    </Container>
  );
};

export default Loader('upcomingMovies')(UpcomingMovies);
