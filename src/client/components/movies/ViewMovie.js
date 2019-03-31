import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MovieOverview from './MovieOverview';
import MovieCast from './MovieCast';
import MovieDetails from './MovieDetails';
import MoviePoster from './MoviePoster';
import Reviews from './Reviews';
import SimilarMovies from './SimilarMovies';
import ContentLoader from '../layout/ContentLoader';

// actions
import { fetchSelectedMovie, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty } from '../../helpers/helperFunctions';

class ViewMovie extends Component {
  componentDidMount() {
    const movieId = this.props.match.params.id;
    this.fetchMovie(movieId);
    window.scrollTo(undefined, 0);
  }

  componentWillReceiveProps(nextProps) {
    const newId = nextProps.match.params.id;
    if (this.props.match.params.id !== newId) {
      this.fetchMovie(newId);
    }
  }

  fetchMovie = (id) => {
    const { category } = this.props.match.params;

    if (parseInt(id, 10) !== this.props.movie.id) {
      this.props.isCurrentlyFetching();
      this.props.fetchSelectedMovie(category, id);
    }
  };

  onClickViewImage = () => {
    this.props.history.push(`/view/movie/${this.props.match.params.id}/images`);
    window.scrollTo(null, 0);
  };

  render() {
    const {
      movie, 
      reviews,
      favorites,
      casts,
      keywords,
      isLoading
    } = this.props;
    const posters = movie.images ? movie.images.posters : [];
   
    return (
      <React.Fragment>
        {isLoading && <ContentLoader />}
        {(!isLoading && !isEmpty(movie)) && (
          <div className="container pt-0 mt-0">
            <MovieOverview 
                favorites={favorites}
                movie={movie}
            />
            <div className="movie__casts">
              <div className="movie__casts-content">
                <MovieCast casts={casts} />
                <MovieDetails 
                    keywords={keywords}
                    movie={movie}
                />
              </div>
            </div>
            {movie.images && (
              <div className="poster">
                <div className="poster__wrapper">
                  <MoviePoster 
                      id={movie.id}
                      posters={posters.length > 10 ? posters.slice(0, 10) : posters}
                  />
                  <button 
                      className="button--primary button--block m-auto"
                      onClick={this.onClickViewImage}
                  >
                    View All Posters
                  </button>
                </div>
              </div>
            )}
            {movie.similar && (
              <div className="similar">
                <SimilarMovies movies={movie.similar.results} />
              </div>
            )}
            {(!isEmpty(reviews) && reviews.results.length !== 0) && (
              <div className="reviews">
                <Reviews reviews={reviews} />
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

ViewMovie.propTypes = {
  addToFavorites: PropTypes.func,
  casts: PropTypes.arrayOf(PropTypes.object),
  favorites: PropTypes.arrayOf(PropTypes.object),
  fetchSelectedMovie: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  isLoading: PropTypes.bool,
  keywords: PropTypes.arrayOf(PropTypes.object),
  movie: PropTypes.object,
  removeFromFavorites: PropTypes.func,
  reviews: PropTypes.object
};

const mapStateToProps = ({ favorites, current, isLoading }) => ({
  favorites,
  movie: current.movie,
  casts: current.casts,
  keywords: current.keywords,
  reviews: current.reviews,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  isCurrentlyFetching: () => dispatch(isCurrentlyFetching()),
  fetchSelectedMovie: (category, id) => dispatch(fetchSelectedMovie(category, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewMovie);
