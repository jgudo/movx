import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../components/hoc/Loader';  
import MovieCard from '../../components/movies/MovieCard';
import PaginationBar from '../../components/common/PaginationBar';
import Footer from '../../components/common/Footer';

// actions
import { fetchTopRatedMovies } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const TopRatedMovies = ({ topRatedMovies, fetchTopRated, isLoading }) => {
  const queryString = 'movie/top_rated?';
  
  useEffect(() => {
    if (isEmpty(topRatedMovies)) {
      fetchTopRated(queryString);
    }
  }, []);
 
  const handlePageChange = (e) => {
    if (topRatedMovies.page !== e && !isLoading) {
      fetchTopRated(queryString, e);
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

TopRatedMovies.propTypes = {
  fetchTopRatedMovies: PropTypes.func,
  topRatedMovies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

const mapStateToProps = ({ topRatedMovies, isLoading }) => ({
  topRatedMovies,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchTopRated: (url, page) => dispatch(fetchTopRatedMovies(url, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader('topRatedMovies')(TopRatedMovies));
