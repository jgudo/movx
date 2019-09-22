import React from 'react';
import { useDispatch } from 'react-redux';

import MovieCard from '../../../components/movies/MovieCard';
import PaginationBar from '../../../components/common/PaginationBar';

// actions
import { searchTvShows } from '../../../actions/searchActions';

// helpers
import { isEmpty } from '../../../helpers/helperFunctions';

const SearchTvTab = ({ tvShows, isLoading, query }) => {
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    if (tvShows.page !== page && !isLoading) {
      dispatch(searchTvShows(`/search/tv?query=${query}`, page));
    }
  };

  return (
    !isEmpty(tvShows) && tvShows.results.length !== 0 ? (
      <>
        <div className="movie__wrapper">
          {tvShows.results.map((tv, index) => (
            <MovieCard 
                category="tv"
                key={`${tv.id}_${index}`}
                movie={tv} 
            />
          ))}
        </div>
        {tvShows.total_page > 1 && (
          <PaginationBar 
              activePage={tvShows.page}
              itemsCountPerPage={1}
              onChange={handlePageChange}
              pageRangeDisplayed={10}
              totalItemsCount={tvShows.total_pages}
              totalPage={tvShows.total_pages}
          />
        )}
      </>
    ) : (
      <div className="search__no-result">
        <h1>No result found.</h1>
      </div>
    )
  );
};

export default SearchTvTab;
