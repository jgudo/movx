import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../components/hoc/Loader'; 
import MovieCard from '../../components/movies/MovieCard';
import PaginationBar from '../../components/common/PaginationBar';
import Footer from '../../components/common/Footer';

// actions
import { fetchPopularMovies } from '../../actions/movieActions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const PopularMovies = (props) => {
  const { popularMovies, isLoading, favorites } = useSelector(state => ({
    popularMovies: state._movies.popularMovies,
    isLoading: state._misc.isLoading,
    favorites: state._misc.favorites
  }));
  const dispatch = useDispatch();
  const route = '/movie/popular';
  
  useEffect(() => {
    if (isEmpty(popularMovies)) {
      dispatch(fetchPopularMovies(route));
    }
  }, []);

  const handlePageChange = (page) => {
    if (popularMovies.page !== page && !isLoading) {
      dispatch(fetchPopularMovies(route, page));
    }
  };

  return !isEmpty(popularMovies) && (
    <div className="container__movies">
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Popular Movies</h1>
          <h3>{numberWithCommas(popularMovies.total_results)} Movies</h3>
        </div>
      </div>
      <div className="movie__wrapper">
        {popularMovies.results.map((movie, index) => (
          <MovieCard 
              category="movie"
              key={`${movie.id}_${index}`}
              movie={movie} 
              favorites={favorites}
          />
        ))}
      </div>
      <PaginationBar 
          activePage={popularMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={popularMovies.total_pages}
          totalPage={popularMovies.total_pages}
      />
      <Footer />
    </div>  
  );
};

PopularMovies.propTypes = {
  fetchPopularMovies: PropTypes.func,
  popularMovies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

export default Loader('popularMovies')(PopularMovies);
