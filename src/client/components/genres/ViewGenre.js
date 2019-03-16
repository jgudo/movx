import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from '../movies/MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const queryString = 'discover/movie?';

const ViewGenre = (props) => {
  const { genreMovies, isLoading } = props;
  const { genre } = props.match.params;

  const fetchMovieGenre = (page = 1) => {
    const genreId = props.match.params.id;
    const fullQuery = `${queryString}&with_genres=${genreId}`;

    props.isCurrentlyFetching();
    props.fetchRequest('FETCH_GENRE_CATEGORY', fullQuery, page);
  };

  useEffect(() => {
    fetchMovieGenre();
  }, []);


  const handlePageChange = (e) => {
    if (props.genreMovies.activePage !== e && !props.isLoading) {
      fetchMovieGenre(e);
    }
  };

  return (
    <React.Fragment>
      <TopProgressLoader isLoading={isLoading} />
      {isEmpty(genreMovies) && <LoadingScreen />}
      <div className="container">
        <div className="container__wrapper container__movies">
          {!isEmpty(genreMovies) && (
            <React.Fragment>
              <div className="movie__header">
                <div className="movie__header-title">
                  <h1>{genre.replace('-', ' ')}</h1>
                  <h3>{numberWithCommas(genreMovies.total_results)} Movies</h3>
                </div>
              </div>
              <div className="movie__wrapper">
                {genreMovies.collection.map((movie, index) => {
                  return (
                    <MovieCard 
                        category="movie"
                        key={`${movie.id}_${index}`}
                        movie={movie} 
                    />
                  )
                })}
              </div>
              <PaginationBar 
                  activePage={genreMovies.activePage}
                  itemsCountPerPage={1}
                  onChange={handlePageChange}
                  pageRangeDisplayed={10}
                  totalItemsCount={genreMovies.total_pages}
                  totalPage={genreMovies.total_pages}
            />
            <Footer />
            </React.Fragment>
          )}
        </div>  
    </div>
    </React.Fragment>
  );
};

ViewGenre.propTypes = {
  genreMovies: PropTypes.shape({
    total_results: PropTypes.number,
    total_pages: PropTypes.number,
    activePage: PropTypes.number,
    collection: PropTypes.arrayOf(PropTypes.object)
  }),
  isLoading: PropTypes.bool
};

const mapStateToProps = ({ genreMovies, isLoading, error }) => ({
  genreMovies,
  isLoading,
  error
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewGenre);
