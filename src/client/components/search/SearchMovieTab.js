import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MovieCard from '../movies/MovieCard';
import PaginationBar from '../layout/PaginationBar';

// actions
import { SEARCH_MOVIES } from '../../constants/constants';
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty } from '../../helpers/helperFunctions';

const SearchMovieTab = (props) => {
  const { movies, isLoading, query } = props;
  const handlePageChange = (e) => {
    if (movies.page !== e && !isLoading) {
      props.isCurrentlyFetching();
      props.fetchRequest(SEARCH_MOVIES, `search/movie?query=${query}`, e);
    }
  };

  return (
    (!isEmpty(movies) && movies.results.length !== 0) ? (
      <React.Fragment>
        <div className="movie__wrapper">
          {movies.results.map((movie, index) => {
            return (
              <MovieCard 
                  category="movie"
                  key={`${movie.id}_${index}`}
                  movie={movie} 
              />
            )
          })}
        </div>
        {movies.total_pages > 1 && (
          <PaginationBar 
              activePage={movies.page}
              itemsCountPerPage={1}
              onChange={handlePageChange}
              pageRangeDisplayed={10}
              totalItemsCount={movies.total_pages}
              totalPage={movies.total_pages}
          />
        )}
      </React.Fragment>
    ) : (
      <div className="search__no-result">
        <h1>No result found.</h1>
      </div>
    )
  );
};

SearchMovieTab.propTypes = {
  fetchRequest: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  isLoading: PropTypes.bool,
  movies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  }),
  query: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(undefined, mapDispatchToProps)(SearchMovieTab);
