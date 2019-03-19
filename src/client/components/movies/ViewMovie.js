import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ModalVideo from 'react-modal-video';
import Modal from 'react-responsive-modal';
import LazyLoad from 'react-lazy-load';

import PeopleCard from '../people/PeopleCard';
import ImageLoader from '../layout/ImageLoader';
import LoadingScreen from '../layout/LoadingScreen';

// actions
import { 
  addToFavorites, 
  removeFromFavorites, 
  fetchSelected, 
  isCurrentlyFetching 
} from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas, toHrsMins } from '../../helpers/helperFunctions';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
const tmdbBackdropPath = 'https://image.tmdb.org/t/p/w1400_and_h450_face/';

class ViewMovie extends Component {
  state = {
    isOpenVideoModal: false,
    isOpenModal: false,
    error: undefined
  };

  componentDidMount() {
    const movieId = this.props.match.params.id;
    const movieCategory = this.props.match.params.category;
    window.scrollTo(undefined, 0);
  
    if (parseInt(movieId, 10) !== this.props.movie.id) {
      this.props.isCurrentlyFetching();
      this.props.fetchSelected(movieCategory, movieId)
        .then((state) => {
          if (state === 404) {
            this.setState({ error: 'Movie details cannot be found' });
          }
        });
    }
  }

  openVideoModal = () => {
    if (this.props.movie.videos.results.length >= 1) {
      this.setState(() => ({ isOpenVideoModal: true }));
    } else {
      this.setState(() => ({ isOpenModal: true }));
    }
  };

  found = () => {
    return this.props.favorites.some(item => item.id === this.props.movie.id);
  };

  onAddToFavorites = () => {
    if (!this.found()) this.props.addToFavorites(this.props.movie);
    else this.props.removeFromFavorites(this.props.movie.id); 
  };

  closeVideoModal = () => {
    this.setState(() => ({ isOpenVideoModal: false }));
  };

  openModal = () => {
    this.setState({ isOpenModal: true });
  };

  closeModal = () => {
    this.setState({ isOpenModal: false });
  };
  
  getReleaseYear = (date) => {
    if (date) {
      return date.split('-')[0];
    }
  };

  goPreviousPage = () => {
    this.props.history.goBack();
  };

  render() {
    const { 
      isOpenModal, 
      isOpenVideoModal,
      error
    } = this.state;
    const {
      movie, 
      casts,
      keywords,
      isLoading
    } = this.props;

    const youtube = 'https://www.youtube.com/results?search_query=';

    return (
      <React.Fragment>
        {isLoading && <LoadingScreen />}
        {(!isEmpty(movie) && movie.videos.results.length >= 1) && (
          <ModalVideo 
              channel='youtube' 
              isOpen={isOpenVideoModal}
              videoId={movie.videos.results[0].key} 
              onClose={this.closeVideoModal} 
          />
        )}
        <Modal 
            center
            onClose={this.closeModal} 
            open={isOpenModal} 
            styles={{
              modal: {
                background: '#272c30',
                padding: '50px',
                textAlign: 'center',
                borderRadius: '6px'
              },
              closeButton: {
                top: '10px',
                right: '0'
              },
              closeIcon: {
                fill: '#fff'
              }  
            }}
        >
          <h2>No Trailer Found</h2>
          <p>View in youtube instead</p>
          <a  
              className="modal__link"
              href={`${youtube + movie.original_title + this.getReleaseYear(movie.release_date)}`}
              target="_blank">
            Search in Youtube
          </a>
        </Modal>
        <div className="container pt-0 mt-0">
          <div className="container__wrapper w-100">
            {(!isLoading && !isEmpty(movie) && !error) && (
              <React.Fragment>
                <div className="backdrop__container">
                  <img 
                      alt=""
                      className="backdrop__image"
                      src={`${tmdbBackdropPath + movie.backdrop_path}`} 
                  />
                </div>
                <div className="back__button">
                  <button 
                      className="button--back"
                      onClick={this.goPreviousPage}>
                    Back
                  </button>
                </div>
                <div className="view">
                  <div className="view__poster">
                    <LazyLoad 
                        debounce={false}
                        offsetVertical={500}
                      >
                        <ImageLoader 
                            alt={movie.original_title || movie.original_name || movie.title}
                            imgId={movie.id} 
                            src={movie.poster_path ? `${tmdbPosterPath + movie.poster_path}` : '/images/img-placeholder.jpg'} 
                        />
                    </LazyLoad>
                  </div>
                  <div className="view__details">
                    <h1 className="view__title">
                      {movie.original_title || movie.original_name}
                      &nbsp;
                      {movie.release_date && <span>{`(${this.getReleaseYear(movie.release_date)})`}</span>
                      }
                    </h1>
                    <p className="view__rating">
                      <span className="icon icon-star">★</span>
                      &nbsp;{movie.vote_average} Rating
                    </p>
                    <h4 className="view__overview-title">Overview</h4>
                    <p className="view__overview">{movie.overview}</p>
                    <div className="view__actions">
                      <button className="button--primary" onClick={this.openVideoModal}>
                        Watch Trailer
                        <span className="icon icon-play">▶️</span>
                      </button>
                      <button 
                          className="button--outlined button--favorites"
                          onClick={this.onAddToFavorites}
                          style={{
                            background: this.found() ? '#ff2e4f' : 'transparent',
                            border: this.found() ? '1px solid #ff2e4f' : '1px solid #fff'
                          }}
                      >
                        {this.found() ? 'Remove From Favorites' : 'Add To Favorites'}
                        <span className="icon icon-heart">♥</span>
                      </button>
                    </div>
                  </div>            
                </div>
              </React.Fragment>
            )}
            {(error && !isLoading) && (
              <div className="view__not-found">
                <h1>{error}</h1>
                <button 
                    className="button--primary"
                    onClick={this.goPreviousPage}>
                    Go Back
                </button>
              </div>
            )}
          </div>
          {(casts.length >= 1 && !isLoading && !error) && (
            <div className="movie__casts">
              <div className="movie__casts-content">
                <div className="movie__casts-wrapper">
                  <div className="movie__casts-header">
                    <h1>Top Billed Casts</h1>
                  </div>
                  <div className="movie__casts-grid">
                    {casts.map((person, index) => {
                      return index < 12 && (
                          <PeopleCard 
                              category="people"
                              key={person.id + person.name}
                              people={person}
                          />
                      );
                    })}
                  </div>
                  <button className="button--primary">
                    View All Casts
                  </button>
                </div>
                <div className="movie__details">
                  <div className="movie__details-genre">
                    <h4>Genres</h4>
                    {movie.genres && movie.genres.map((genre) => {
                      const genreName = genre.name.toLowerCase().replace(' ', '-');
                      return (
                        <Link 
                            className="button--key"
                            key={genre.id + genre.name}
                            to={`/genre/${genreName}/${genre.id}`} 
                        >
                          {genre.name}
                        </Link>
                      );
                    })}
                  </div>
                  {movie.release_date && (
                    <div className="movie__details-release">
                      <h4>Release Date</h4>
                      <p>{movie.release_date}</p>
                    </div>
                  )}
                  {movie.budget && (
                    <div className="movie__details-budget">
                      <h4>Budget</h4>
                      <p>${numberWithCommas(movie.budget)}</p>
                    </div>
                  )}
                  {movie.revenue && (
                    <div className="movie__details-revenue">
                      <h4>Revenue</h4>
                      <p>${numberWithCommas(movie.revenue)}</p>
                    </div>
                  )}
                  {movie.runtime && (
                    <div className="movie__details-runtime">
                      <h4>Runtime</h4>
                      <p>{toHrsMins(movie.runtime)}</p>
                    </div>
                  )}
                  
                  <div className="movie__details-keywords">
                    <h4>Keywords</h4>
                    {keywords ? keywords.map((keyword) => {
                      return (
                        <Link 
                            className="button--key"
                            key={keyword.id + keyword.name}
                            to={`/search/movie/${keyword.name}`} 
                        >
                          #{keyword.name}
                        </Link>
                      );
                    }) : (
                      <p>No keywords found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

ViewMovie.propTypes = {
  addToFavorites: PropTypes.func,
  casts: PropTypes.arrayOf(PropTypes.object),
  favorites: PropTypes.arrayOf(PropTypes.object),
  fetchSelected: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  isLoading: PropTypes.bool,
  keywords: PropTypes.arrayOf(PropTypes.object),
  movie: PropTypes.object,
  removeFromFavorites: PropTypes.func
};

const mapStateToProps = ({ favorites, current, isLoading }) => ({
  favorites,
  movie: current.movie,
  casts: current.casts,
  keywords: current.keywords,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  addToFavorites: favorites => dispatch(addToFavorites(favorites)),
  removeFromFavorites: id => dispatch(removeFromFavorites(id)),
  isCurrentlyFetching: () => dispatch(isCurrentlyFetching()),
  fetchSelected: (category, id) => dispatch(fetchSelected(category, id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewMovie));
