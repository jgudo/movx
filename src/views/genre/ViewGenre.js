import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../components/hoc/Loader';
import MovieCard from '../../components/movies/MovieCard';
import PaginationBar from '../../components/common/PaginationBar';
import Footer from '../../components/common/Footer';

// actions
import { fetchGenreCategory } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const ViewGenre = (props) => {
  const { genreMovies, getGenreCategory, isLoading } = props;
  const query = `discover/movie?&with_genres=${props.match.params.id}`;

  useEffect(() => {
    getGenreCategory(query);
  }, []);

  const handlePageChange = (e) => {
    if (genreMovies.page !== e && !isLoading) {
      getGenreCategory(query, e);
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
  getGenreCategory: (action, url, page) => dispatch(fetchGenreCategory(action, url, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader('genreMovies')(ViewGenre));
