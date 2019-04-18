import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import ModalVideo from 'react-modal-video';
import Modal from 'react-responsive-modal';
import ImageLoader from '../layout/ImageLoader';
import imgPlaceholder from '../../images/img-placeholder.jpg';
import imgBackground from '../../images/background.jpg';
// actions
import { addToFavorites, removeFromFavorites } from '../../actions/actions';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
const tmdbBackdropPath = 'https://image.tmdb.org/t/p/original';

class MovieOverview extends Component {
  state = {
    isOpenVideoModal: false,
    isOpenModal: false
  };

  openVideoModal = () => {
    if (this.props.movie.videos.results.length >= 1) {
      this.setState({ isOpenVideoModal: true });
    } else {
      this.setState({ isOpenModal: true });
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
    this.setState({ isOpenVideoModal: false });
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

  getTrailerKey = () => {
    try {
      const { key } = this.props.movie.videos.results[0];
      return key;
    } catch (e) {}
  };

  goPreviousPage = () => {
    this.props.history.goBack();
  };
  
  render() {
    const { movie } = this.props;
    const { isOpenModal, isOpenVideoModal } = this.state;
    const youtube = 'https://www.youtube.com/results?search_query=';
    const modalStyle = {
      modal: {
        background: '#272c30',
        padding: '50px',
        textAlign: 'center',
        borderRadius: '6px'
      },
      closeButton: {
        top: '10px',
        right: '10px'
      },
      closeIcon: {
        fill: '#fff'
      }  
    };

    return (
      <div className="container pt-0 mt-0">
        <ModalVideo 
            channel="youtube" 
            isOpen={isOpenVideoModal}
            onClose={this.closeVideoModal} 
            videoId={this.getTrailerKey() || null} 
        />
        <Modal 
            center
            onClose={this.closeModal} 
            open={isOpenModal} 
            styles={modalStyle}
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
          <div className="backdrop__container">
            <img 
                alt=""
                className="backdrop__image"
                src={movie.backdrop_path ? `${tmdbBackdropPath + movie.backdrop_path}` : imgBackground} 
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
                    src={movie.poster_path ? `${tmdbPosterPath + movie.poster_path}` : imgPlaceholder} 
                />
              </LazyLoad>
            </div>
            <div className="view__details">
              <h1 className="view__title">
                {movie.original_title || movie.original_name}
                {movie.release_date && <span>{` (${this.getReleaseYear(movie.release_date)}) `}</span>}
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
                  <span className="icon icon-play">►</span>
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addToFavorites: favorites => dispatch(addToFavorites(favorites)),
  removeFromFavorites: id => dispatch(removeFromFavorites(id))
});

export default withRouter(connect(undefined, mapDispatchToProps)(MovieOverview));
