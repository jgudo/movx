import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/hoc/Loader';
import MovieCard from '../../components/movies/MovieCard';
import PaginationBar from '../../components/common/PaginationBar';
import Footer from '../../components/common/Footer';

// actions
import { fetchGenreCategory } from '../../actions/genreActions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

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

  return !isEmpty(genreMovies) && (
    <div className="container__movies">
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>{props.match.params.genre.replace('-', ' ')}</h1>
          <h3>{numberWithCommas(genreMovies.total_results)} Movies</h3>
        </div>
      </div>
      <div className="movie__wrapper">
        {genreMovies.results.map((movie, index) => {
          return (
            <MovieCard 
                category="movie"
                key={`${movie.id}_${index}`}
                movie={movie} 
                favorites={favorites}
            />
          );
        })}
      </div>
      <PaginationBar 
          activePage={genreMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={genreMovies.total_pages}
          totalPage={genreMovies.total_pages}
      />
      <Footer />
    </div>  
  );
};

export default ViewGenre;
