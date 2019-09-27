import React from 'react';
import { useDispatch } from 'react-redux';

import MovieCard from 'components/movies/MovieCard';
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
      <div className="movie__wrapper">
        {movies.results.map((movie, index) => (
          <MovieCard 
              category="movie"
              favorites={favorites}
              key={`${movie.id}_${index}`}
              movie={movie} 
          />
        ))}
      </div>
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
      <h1>No result found.</h1>
    </div>
  );
};

export default SearchMovieTab;
