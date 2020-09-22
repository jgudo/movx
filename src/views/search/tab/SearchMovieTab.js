import React from 'react';
import { useDispatch } from 'react-redux';

import MovieList from 'components/movies/MovieList';
import PaginationBar from 'components/common/PaginationBar';

import { searchMovies } from 'actions/searchActions';
import { isEmpty } from 'helpers/helperFunctions';

const SearchMovieTab = ({ movies, favorites, isLoading, query }) => {
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    if (movies.page !== page && !isLoading) {
      dispatch(searchMovies(`/search/movie?query=${query}`, page));
    }
  };

  return (!isEmpty(movies) && movies.results.length !== 0) ? (
    <>
      <MovieList
        category="movie"
        isLoading={isLoading}
        movies={movies.results}
        favorites={favorites}
      />
      <PaginationBar
        activePage={movies.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={movies.total_pages}
        totalPage={movies.total_pages}
      />
    </>
  ) : (
      <div className="search__no-result">
        <h1>No movie found.</h1>
        <i className="fa fa-film" />
      </div>
    );
};

export default SearchMovieTab;
