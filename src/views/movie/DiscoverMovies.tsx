import Container from '@app/components/common/Container';
import Filter from '@app/components/common/Filter';
import PaginationBar from '@app/components/common/PaginationBar';
import withLoader from '@app/components/hoc/withLoader';
import MovieList from '@app/components/movies/MovieList';
// helpers
import { numberWithCommas } from '@app/helpers/helperFunctions';
// hooks
import useDidMount from '@app/hooks/useDidMount';
import useDocumentTitle from '@app/hooks/useDocumentTitle';
import usePageSaver from '@app/hooks/usePageSaver';
import { fetchDiscoverMovies } from '@app/redux/actions/movieActions';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DiscoverMovies = () => {
  const { discoverMovies, filter } = useSelector((state: IRootState) => ({
    discoverMovies: state.movies.discover,
    filter: state.filters.discover,
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const { currentPage, setCurrentPage } = usePageSaver();

  useDocumentTitle('Discover Movies | MOVX');
  useEffect(() => {
    if (!discoverMovies || didMount) {
      dispatch(fetchDiscoverMovies(currentPage));
    }
  }, [filter]);

  const handlePageChange = (page: number) => {
    if (discoverMovies?.page !== page) {
      dispatch(fetchDiscoverMovies(page));
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Discover Movies</h1>
          <h3>{numberWithCommas(discoverMovies?.total_results || 0)} Movies</h3>
        </div>
        {discoverMovies && (
          <Filter filterCategory="discover" />
        )}
      </div>
      <MovieList
        movies={discoverMovies?.results || []}
        templateCount={10}
      />
      {discoverMovies && (
        <PaginationBar
          activePage={discoverMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={discoverMovies.total_pages}
          totalPage={discoverMovies.total_pages}
        />
      )}
    </Container>
  );
};

export default withLoader('discoverMovies')(DiscoverMovies);
