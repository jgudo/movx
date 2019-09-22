import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/hoc/Loader';  
import MovieCard from '../../components/movies/MovieCard';
import PaginationBar from '../../components/common/PaginationBar';
import Footer from '../../components/common/Footer';

// actions
import { fetchTopRatedMovies } from '../../actions/movieActions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

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

  return !isEmpty(topRatedMovies) && (
    <div className="container__movies">
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Top Rated Movies</h1>
          <h3>{numberWithCommas(topRatedMovies.total_results)} Movies</h3>
        </div>
      </div>
      <div className="movie__wrapper">
        {topRatedMovies.results.map((movie, index) => (
          <MovieCard 
              category="movie"
              key={`${movie.id}_${index}`}
              movie={movie} 
              favorites={favorites}
          />
        ))}
      </div>
      <PaginationBar 
          activePage={topRatedMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={topRatedMovies.total_pages}
          totalPage={topRatedMovies.total_pages}
      />
      <Footer />
    </div>
  );
};

export default Loader('topRatedMovies')(TopRatedMovies);
