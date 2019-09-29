import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MovieCard from 'components/movies/MovieCard';
import PaginationBar from 'components/common/PaginationBar';
import Filter from 'components/common/Filter';
import Loader from 'components/hoc/Loader';

// actions
import { fetchDiscoverMovies } from 'actions/movieActions';

// hooks 
import useDidMount from 'hooks/useDidMount';

// helpers
import { isEmpty, numberWithCommas } from 'helpers/helperFunctions'; 

const DiscoverMovies = (props) => {
  const { discoverMovies, filter, favorites } = useSelector(state => ({
    discoverMovies: state._movies.discoverMovies,
    filter: state._filters,
    favorites: state._misc.favorites
  }));
  const query = '/discover/movie?';
  const dispatch = useDispatch();
  const didMount = useDidMount();

  useEffect(() => {
    if (isEmpty(discoverMovies) || didMount) {
      dispatch(fetchDiscoverMovies(`${query}${filter.discover.query}`));
    }
  }, [filter.discover.query]);

  const handlePageChange = (page) => {
    if (discoverMovies.page !== page) {
      dispatch(fetchDiscoverMovies(`${query}?${filter.discover.query}`, page));
    }
  };

  return (
    <div className="container">
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Discover Movies</h1>
          <h3>{numberWithCommas(discoverMovies.total_results)} Movies</h3>
        </div>
        {discoverMovies.results && (
          <Filter 
              filterCategory="discover"
              filterData={filter.discover}
          />
        )}
      </div>  
      <div className="movie__wrapper">
        {discoverMovies.results ? 
          discoverMovies.results.map((movie, index) => (
            <MovieCard 
                category="movie"
                key={`${movie.id}_${index}`}
                movie={movie} 
                favorites={favorites}
            />
          ))
          : new Array(10).fill({}).map((item, index) => (
            <MovieCard 
                category="movie"
                key={`skeleton_${index}`}
                movie={{}} 
                favorites={[]}
            />
          ))
        }
      </div>
      <PaginationBar 
          activePage={discoverMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={discoverMovies.total_pages}
          totalPage={discoverMovies.total_pages}
      />
    </div>
  );
};

export default Loader('discoverMovies')(DiscoverMovies);
