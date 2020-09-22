import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from 'components/hoc/Loader';
import MovieList from 'components/movies/MovieList';
import Container from 'components/common/Container';
import PaginationBar from 'components/common/PaginationBar';
import Filter from 'components/common/Filter';

import useDidMount from 'hooks/useDidMount';
import { fetchTvShows } from 'actions/movieActions';
import { isEmpty, numberWithCommas } from 'helpers/helperFunctions';

const TvShows = (props) => {
  const { tvShows, filter, favorites, isLoading } = useSelector(state => ({
    tvShows: state._movies.tvShows,
    filter: state._filters,
    favorites: state._misc.favorites,
    isLoading: state._misc.isLoading
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
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>TV Shows</h1>
          <h3>{numberWithCommas(tvShows.total_results)} TV Shows</h3>
        </div>
        {tvShows.results && (
          <Filter
            filterCategory="tv"
            filterData={filter.tv}
            isLoading={isLoading}
          />
        )}
      </div>
      <MovieList
        category="tv"
        favorites={favorites}
        isLoading={isLoading}
        movies={tvShows.results}
        templateCount={10}
      />
      <PaginationBar
        activePage={tvShows.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={tvShows.total_pages}
        totalPage={tvShows.total_pages}
      />
    </Container>
  );
};

export default Loader('tvShows')(TvShows);
