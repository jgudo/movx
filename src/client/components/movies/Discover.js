import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MovieCard from './MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';
import Filter from '../layout/Filter';
import Loader from '../hoc/Loader';

// actions
import { fetchDiscoverMovies } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions'; 

const DiscoverMovies = (props) => {
  const { 
    fetchDiscover,
    discoverMovies, 
    filter, 
    filter: {
      discover
    } 
  } = props;
  const query = 'discover/movie?';

  useEffect(() => {
    if (isEmpty(discoverMovies)) {
      fetchDiscover(`${query}${discover.query}`);
    }
  }, []);

  // Will re-run only if the filters changed
  useEffect(() => {
    fetchDiscover(`${query}${discover.query}`);
  }, [filter.discover.query]);

  const handlePageChange = (e) => {
    if (discoverMovies.page !== e) {
      fetchDiscover(`${query}${discover.query}`, e);
    }
  };

  return !isEmpty(discoverMovies) && (
    <div className="container">
      <div className="container__wrapper container__movies">
        <div className="movie__header">
          <div className="movie__header-title">
            <h1>Discover Movies</h1>
            <h3>{numberWithCommas(discoverMovies.total_results)} Movies</h3>
          </div>
          <Filter 
              filterCategory="discover"
              filterData={filter.discover}
          />
        </div>  
        <div className="movie__wrapper">
          {discoverMovies.results.map((movie, index) => (
            <MovieCard 
                category="movie"
                key={`${movie.id}_${index}`}
                movie={movie} 
            />
          ))}
        </div>
        <PaginationBar 
            activePage={discoverMovies.page}
            itemsCountPerPage={1}
            onChange={handlePageChange}
            pageRangeDisplayed={10}
            totalItemsCount={discoverMovies.total_pages}
            totalPage={discoverMovies.total_pages}
        />
        <Footer />
      </div>
    </div>
  );
};

DiscoverMovies.propTypes = {
  discoverMovies: PropTypes.object,
  filter: PropTypes.objectOf(PropTypes.object)
};

const mapStateToProps = ({ discoverMovies, filter, isLoading }) => ({
  discoverMovies,
  filter,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchDiscover: (url, page) => dispatch(fetchDiscoverMovies(url, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader('discoverMovies')(DiscoverMovies));
