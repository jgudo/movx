import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../hoc/Loader';
import MovieCard from './MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';
import Filter from '../layout/Filter';

// actions
import { fetchTvShows } from '../../actions/actions';

// hooks 
import useDidMount from '../../hooks/useDidMount';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const TvShows = ({ tvShows, filter, fetchTv }) => {
  const query = 'discover/tv?&language=en-US';
  const didMount = useDidMount();

  useEffect(() => {
    if (isEmpty(tvShows) || didMount) {
      fetchTv(`${query}${filter.tv.query}`);
    }
  }, [filter.tv.query]);

  const handlePageChange = (e) => {
    if (tvShows.page !== e) {
      fetchTv(`${query}${filter.tv.query}`, e);
    }
  };

  return !isEmpty(tvShows) && (
    <div className="container">
      <div className="container__wrapper container__movies">
        <div className="movie__header">
          <div className="movie__header-title">
            <h1>TV Shows</h1>
            <h3>{numberWithCommas(tvShows.total_results)} TV Shows</h3>
          </div> 
          <Filter 
              filterCategory="tv"
              filterData={filter.tv}
          /> 
        </div>
      <div className="movie__wrapper">
        {tvShows.results.map(show => (
          <MovieCard 
              category="tv"
              key={show.id}
              movie={show} 
          />
        ))}
      </div>
      {tvShows.total_pages > 1 && (
        <PaginationBar 
            activePage={tvShows.page}
            itemsCountPerPage={1}
            onChange={handlePageChange}
            pageRangeDisplayed={10}
            totalItemsCount={tvShows.total_pages}
            totalPage={tvShows.total_pages}
        />
      )}
      <Footer />
      </div>    
    </div>
  );
};

TvShows.propTypes = {
  fetchRequest: PropTypes.func,
  filter: PropTypes.objectOf(PropTypes.object),
  tvShows: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

const mapStateToProps = ({ tvShows, filter, isLoading }) => ({
  tvShows,
  filter,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchTv: (url, page) => dispatch(fetchTvShows(url, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader('tvShows')(TvShows));
