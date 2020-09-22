import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from 'components/hoc/Loader';
import MovieList from 'components/movies/MovieList';
import Container from 'components/common/Container';
import PaginationBar from 'components/common/PaginationBar';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { fetchPopularMovies } from 'actions/movieActions';
import { isEmpty, numberWithCommas } from 'helpers/helperFunctions';

const PopularMovies = (props) => {
  const { popularMovies, isLoading, favorites } = useSelector(state => ({
    popularMovies: state._movies.popularMovies,
    isLoading: state._misc.isLoading,
    favorites: state._misc.favorites
  }));
  const dispatch = useDispatch();
  const route = '/movie/popular';

  useDocumentTitle('Popular Movies | MOVX');
  useEffect(() => {
    if (isEmpty(popularMovies)) {
      dispatch(fetchPopularMovies(route));
    }
  }, []);

  const handlePageChange = (page) => {
    if (popularMovies.page !== page && !isLoading) {
      dispatch(fetchPopularMovies(route, page));
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Popular Movies</h1>
          <h3>{numberWithCommas(popularMovies.total_results)} Movies</h3>
        </div>
      </div>
      <MovieList
        movies={popularMovies.results}
        favorites={favorites}
        isLoading={isLoading}
        templateCount={10}
      />
      <PaginationBar
        activePage={popularMovies.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={popularMovies.total_pages}
        totalPage={popularMovies.total_pages}
      />
    </Container>
  );
};

PopularMovies.propTypes = {
  fetchPopularMovies: PropTypes.func,
  popularMovies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

export default Loader('popularMovies')(PopularMovies);
