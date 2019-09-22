import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../components/hoc/Loader';
import MovieCard from '../../components/movies/MovieCard';
import PaginationBar from '../../components/common/PaginationBar';
import Footer from '../../components/common/Footer';
import Filter from '../../components/common/Filter';

// actions
import { fetchTvShows } from '../../actions/movieActions';

// hooks 
import useDidMount from '../../hooks/useDidMount';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const TvShows = (props) => {
  const { tvShows, filter, favorites } = useSelector(state => ({
    tvShows: state._movies.tvShows,
    filter: state._filters,
    favorites: state._misc.favorites
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const query = '/discover/tv?language=en-US';

  useEffect(() => {
    if (isEmpty(tvShows) || didMount) {
      dispatch(fetchTvShows(`${query}${filter.tv.query}`));
    }
  }, [filter.tv.query]);

  const handlePageChange = (page) => {
    if (tvShows.page !== page) {
      dispatch(fetchTvShows(`${query}${filter.tv.query}`, page));
    }
  };

  return !isEmpty(tvShows) && (
    <div className="container__movies">
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
            favorites={favorites}
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
  );
};

export default Loader('tvShows')(TvShows);
