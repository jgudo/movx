import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../hoc/Loader';
import MovieCard from '../movies/MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// actions
import { fetchGenreCategory } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const ViewGenre = (props) => {
  const { genreMovies } = props;
  const { genre, id } = props.match.params;

  const fetchMovieGenre = (page = 1) => {
    const query = `discover/movie?&with_genres=${id}`;

    props.fetchGenreCategory(query, page);
  };

  useEffect(() => {
    fetchMovieGenre();
  }, []);

  const handlePageChange = (e) => {
    if (genreMovies.page !== e && !isLoading) {
      fetchMovieGenre(e);
    }
  };

  return !isEmpty(genreMovies) && (
    <div className="container">
      <div className="container__wrapper container__movies">
        <div className="movie__header">
          <div className="movie__header-title">
            <h1>{genre.replace('-', ' ')}</h1>
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
    </div>
  );
};

ViewGenre.propTypes = {
  genreMovies: PropTypes.shape({
    total_results: PropTypes.number,
    total_pages: PropTypes.number,
    page: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  }),
  isLoading: PropTypes.bool
};

const mapStateToProps = ({ genreMovies, isLoading, error }) => ({
  genreMovies,
  isLoading,
  error
});

const mapDispatchToProps = dispatch => ({
  fetchGenreCategory: (action, url, page) => dispatch(fetchGenreCategory(action, url, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader('genreMovies')(ViewGenre));
