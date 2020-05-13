import React from 'react';
import { useDispatch } from 'react-redux';

import MovieList from 'components/movies/MovieList';
import PaginationBar from 'components/common/PaginationBar';

// actions
import { searchTvShows } from 'actions/searchActions';

// helpers
import { isEmpty } from 'helpers/helperFunctions';

const SearchTvTab = ({ tvShows, favorites, isLoading, query }) => {
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    if (tvShows.page !== page && !isLoading) {
      dispatch(searchTvShows(`/search/tv?query=${query}`, page));
    }
  };

  return !isEmpty(tvShows) && tvShows.results.length !== 0 ? (
    <>
      <MovieList 
          category="tv"
          movies={tvShows.results}
          favorites={favorites}
      />
      <PaginationBar 
          activePage={tvShows.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={tvShows.total_pages}
          totalPage={tvShows.total_pages}
      />
    </>
  ) : (
    <div className="search__no-result">
      <h1>No result found.</h1>
    </div>
  );
};

export default SearchTvTab;
