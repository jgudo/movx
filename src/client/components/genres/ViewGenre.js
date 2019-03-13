import React, { Component } from 'react';
import { connect } from 'react-redux';

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

class ViewGenre extends Component {
  state = {};

  componentDidMount() {
    this.fetchMovieGenre();
  }

  fetchMovieGenre = (page = 1) => {
    const genreId = this.props.match.params.id;
    const fullQuery = `${queryString}&with_genres=${genreId}`;

    this.props.isCurrentlyFetching();
    this.props.fetchRequest('FETCH_GENRE_CATEGORY', fullQuery, page);
  };

  handlePageChange = (e) => {
    if (this.props.genreMovies.activePage !== e && !this.props.isLoading) {
      this.fetchMovieGenre(e);
    }
  };

  render() {
    const { genreMovies, isLoading } = this.props;
    const { genre } = this.props.match.params;

    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isLoading} />
        {isEmpty(genreMovies) && <LoadingScreen />}
        <div className="container">
          <div className="container__wrapper">
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
                  onChange={this.handlePageChange}
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
  }
}

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
