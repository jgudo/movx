import { Container, Filter, Pagination } from '@app/components/common';
import withLoader from '@app/components/hoc/withLoader';
import { MovieList } from '@app/components/main';
import { numberWithCommas } from '@app/helpers';
import { useDidMount, useDocumentTitle, usePageSaver } from '@app/hooks';
import { fetchTvShows } from '@app/redux/actions';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TvShows = () => {
  const { tvShows, filter } = useSelector((state: IRootState) => ({
    tvShows: state.movies.tvShows,
    filter: state.filters.tv,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const didMount = useDidMount();

  useDocumentTitle('TV Shows | MOVX');
  useEffect(() => {
    if (!tvShows || didMount) {
      dispatch(fetchTvShows(currentPage));
    }
  }, [filter]);

  const handlePageChange = (page: number) => {
    if (tvShows?.page !== page) {
      dispatch(fetchTvShows(page));
      setCurrentPage(page)
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>TV Shows</h1>
          <h3>{numberWithCommas(tvShows?.total_results || 0)} TV Shows</h3>
        </div>
        {tvShows && <Filter filterCategory="tv" />}
      </div>
      <MovieList
        category="tv"
        movies={tvShows?.results || []}
        templateCount={10}
      />
      {tvShows && (
        <Pagination
          activePage={tvShows.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={tvShows.total_pages}
          totalPage={tvShows.total_pages}
        />
      )}
    </Container>
  );
};

export default withLoader('tvShows')(TvShows);
