import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from '../movies/MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// actions
import { FETCH_POPULAR_MOVIES } from '../../constants/constants';
import { fetchPopularMovies, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const PopularMovies = (props) => {
  const { popularMovies, isLoading } = props;
  const queryString = 'movie/popular?';
  
  useEffect(() => {
    if (isEmpty(props.popularMovies)) {
      props.fetchPopularMovies(queryString);
    }
  }, []);

  const handlePageChange = (e) => {
    if (props.popularMovies.page !== e && !props.isLoading) {
      props.isCurrentlyFetching();
      props.fetchPopularMovies(queryString, e);
    }
  };

  return (
    <React.Fragment>
      {(isLoading && isEmpty(popularMovies)) && <LoadingScreen />}
      <div className="container">
        <div className="container__wrapper container__movies">
          {!isEmpty(popularMovies) && (
            <React.Fragment>
              <div className="movie__header">
                <div className="movie__header-title">
                  <h1>Popular Movies</h1>
                  <h3>{numberWithCommas(popularMovies.total_results)} Movies</h3>
                </div>
              </div>
              <div className="movie__wrapper">
                {popularMovies.results.map((movie, index) => {
                  return (
                    <MovieCard 
                        category="movie"
                        key={`${movie.id}_${index}`}
                        movie={movie} 
                    />
                  )
                })}
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
            </React.Fragment>
          )}
        </div>  
    </div>
    </React.Fragment>
  );
};

PopularMovies.propTypes = {
  fetchPopularMovies: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  popularMovies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

const mapStateToProps = ({ popularMovies, isLoading }) => ({
  popularMovies,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchPopularMovies: (url, page) => dispatch(fetchPopularMovies(url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovies);
