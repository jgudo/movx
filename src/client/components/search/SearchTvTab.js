import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MovieCard from '../movies/MovieCard';
import PaginationBar from '../layout/PaginationBar';

// actions
import { searchTvShows, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty } from '../../helpers/helperFunctions';

const SearchTvTab = (props) => {
  const { tvShows, isLoading, query } = props;
  const handlePageChange = (e) => {
    if (tvShows.page !== e && !isLoading) {
      props.isCurrentlyFetching();
      props.searchTvShows(`search/tv?query=${query}`, e);
    }
  };

  return (
    (!isEmpty(tvShows) && tvShows.results.length !== 0) ? (
      <React.Fragment>
        <div className="movie__wrapper">
          {tvShows.results.map((tv, index) => {
            return (
              <MovieCard 
                  category="tv"
                  key={`${tv.id}_${index}`}
                  movie={tv} 
              />
            )
          })}
        </div>
        {tvShows.total_page > 1 && (
          <PaginationBar 
              activePage={tvShows.page}
              itemsCountPerPage={1}
              onChange={handlePageChange}
              pageRangeDisplayed={10}
              totalItemsCount={tvShows.total_pages}
              totalPage={tvShows.total_pages}
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

SearchTvTab.propTypes = {
  searchTvShows: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  isLoading: PropTypes.bool,
  query: PropTypes.string,
  tvShows: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

const mapDispatchToProps = dispatch => ({
  searchTvShows: (url, page) => dispatch(searchTvShows(url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(undefined, mapDispatchToProps)(SearchTvTab);
