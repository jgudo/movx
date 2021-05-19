import { Pagination } from '@app/components/common';
import { MovieList } from '@app/components/main';
import { searchTvShows } from '@app/redux/actions';
import { IRootState } from '@app/types/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const SearchTvTab = () => {
  const dispatch = useDispatch();
  const { query } = useParams<{ query: string }>();
  const { tvShows, isLoading } = useSelector((state: IRootState) => ({
    tvShows: state.search.tv,
    isLoading: state.misc.isLoading
  }))
  const handlePageChange = (page: number) => {
    if (tvShows?.page !== page && !isLoading) {
      dispatch(searchTvShows(query, page));
    }
  };

  return tvShows && tvShows.results.length !== 0 ? (
    <>
      <MovieList category="tv" movies={tvShows.results} />
      <Pagination
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
      <h1>No TV show found.</h1>
      <i className="fa fa-theater-masks" />
    </div>
  );
};

export default SearchTvTab;
