import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MovieList from 'components/movies/MovieList';
import Container from 'components/common/Container';
import PaginationBar from 'components/common/PaginationBar';
import { fetchGenreCategory } from 'actions/genreActions';
import { numberWithCommas } from 'helpers/helperFunctions';

const ViewGenre = (props) => {
  const { genreMovies, isLoading, favorites } = useSelector(state => ({
    genreMovies: state._genre.genreMovies,
    isLoading: state._misc.isLoading,
    favorites: state._misc.favorites
  }));
  const dispatch = useDispatch();
  const query = `/discover/movie?&with_genres=${props.match.params.id}`;

  useEffect(() => {
    dispatch(fetchGenreCategory(query));
  }, []);

  const handlePageChange = (page) => {
    if (genreMovies.page !== page && !isLoading) {
      dispatch(fetchGenreCategory(query, page));
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>{props.match.params.genre.replace('-', ' ')}</h1>
          <h3>{numberWithCommas(genreMovies.total_results)} Movies</h3>
        </div>
      </div>
      <MovieList 
          category="movie"
          favorites={favorites}
          movies={genreMovies.results}
          templateCount={10}
      />
      <PaginationBar 
          activePage={genreMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={genreMovies.total_pages}
          totalPage={genreMovies.total_pages}
      />
    </Container>  
  );
};

export default ViewGenre;
