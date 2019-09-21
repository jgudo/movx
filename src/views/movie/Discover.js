import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MovieCard from '../../components/movies/MovieCard';
import PaginationBar from '../../components/common/PaginationBar';
import Footer from '../../components/common/Footer';
import Filter from '../../components/common/Filter';
import Loader from '../../components/hoc/Loader';

// actions
import { fetchDiscoverMovies } from '../../actions/actions';

// hooks 
import useDidMount from '../../hooks/useDidMount';

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
  const didMount = useDidMount();

  useEffect(() => {
    if (isEmpty(discoverMovies) || didMount) {
      fetchDiscover(`${query}${discover.query}`);
    }
  }, [filter.discover.query]);

  const handlePageChange = (e) => {
    if (discoverMovies.page !== e) {
      fetchDiscover(`${query}${discover.query}`, e);
    }
  };

  return !isEmpty(discoverMovies) && (
    <div className="container__movies">
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
