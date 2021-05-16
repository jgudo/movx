import Container from '@app/components/common/Container';
import PaginationBar from '@app/components/common/PaginationBar';
import withLoader from '@app/components/hoc/withLoader';
import MovieList from '@app/components/movies/MovieList';
import { numberWithCommas } from '@app/helpers/helperFunctions';
import useDocumentTitle from '@app/hooks/useDocumentTitle';
import usePageSaver from '@app/hooks/usePageSaver';
import { fetchUpcomingMovies } from '@app/redux/actions/movieActions';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UpcomingMovies = () => {
  const { upcomingMovies, isLoading } = useSelector((state: IRootState) => ({
    upcomingMovies: state.movies.upcoming,
    isLoading: state.misc.isLoading,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const queryString = '/movie/upcoming';

  useDocumentTitle('Upcoming Movies | MOVX');
  useEffect(() => {
    if (!upcomingMovies) {
      dispatch(fetchUpcomingMovies(queryString, currentPage));
    }
  }, []);

  const handlePageChange = (page: number) => {
    if (upcomingMovies?.page !== page && !isLoading) {
      dispatch(fetchUpcomingMovies(queryString, page));
      setCurrentPage(page)
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Upcoming Movies</h1>
          <h3>{numberWithCommas(upcomingMovies?.total_results || 0)} Movies</h3>
        </div>
      </div>
      <MovieList
        movies={upcomingMovies?.results || []}
        templateCount={10}
      />
      {upcomingMovies && (
        <PaginationBar
          activePage={upcomingMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={upcomingMovies.total_pages}
          totalPage={upcomingMovies.total_pages}
        />
      )}
    </Container>
  );
};

export default withLoader('upcomingMovies')(UpcomingMovies);
