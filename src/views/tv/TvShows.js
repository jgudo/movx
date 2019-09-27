import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from 'components/hoc/Loader';
import MovieCard from 'components/movies/MovieCard';
import PaginationBar from 'components/common/PaginationBar';
import Filter from 'components/common/Filter';

import useDidMount from 'hooks/useDidMount';
import { fetchTvShows } from 'actions/movieActions';
import { isEmpty, numberWithCommas } from 'helpers/helperFunctions';

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

  return (
    <div className="container">
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>TV Shows</h1>
          <h3>{numberWithCommas(tvShows.total_results)} TV Shows</h3>
        </div> 
        {tvShows.results && (
          <Filter 
              filterCategory="tv"
              filterData={filter.tv}
          /> 
        )}
      </div>
      <div className="movie__wrapper">
        {tvShows.results ? tvShows.results.map(show => (
          <MovieCard 
              category="tv"
              favorites={favorites}
              key={show.id}
              movie={show} 
          />
        )) : new Array(10).fill({}).map((item, index) => (
          <MovieCard 
              category="tv"
              favorites={[]}
              key={`skeleton_tv_${index}`}
              movie={{}} 
          />
        ))}
      </div>
      <PaginationBar 
          activePage={tvShows.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={tvShows.total_pages}
          totalPage={tvShows.total_pages}
      />
    </div>    
  );
};

export default Loader('tvShows')(TvShows);
