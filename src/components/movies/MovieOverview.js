import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import LazyLoad from 'react-lazy-load';
import ModalVideo from 'react-modal-video';
import Modal from 'react-responsive-modal';
import ImageLoader from '../common/ImageLoader';
import imgPlaceholder from '../../images/img-placeholder.jpg';
import imgBackground from '../../images/background.jpg';
// actions
import { addToFavorites, removeFromFavorites } from '../../actions/miscActions';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
const tmdbBackdropPath = 'https://image.tmdb.org/t/p/original';

const MovieOverview = ({ movie, favorites, history }) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenVideoModal, setOpenVideoModal] = useState(false);
  const dispatch = useDispatch();
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

  const openVideoModal = () => {
    if (movie.videos.results.length >= 1) {
      setOpenVideoModal(true);
    } else {
      setOpenModal(true);
    }
  };

  const found = () => {
    return favorites.some(item => item.id === movie.id);
  };

  const onAddToFavorites = () => {
    if (!found()) dispatch(addToFavorites(movie));
    else dispatch(removeFromFavorites(movie.id)); 
  };

  const closeVideoModal = () => {
    setOpenVideoModal(false);
  };

  const openModal = () => {
    setOpenModal(false);
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  
  const getReleaseYear = (date) => {
    if (date) {
      return date.split('-')[0];
    }
  };

  const getTrailerKey = () => {
    try {
      const { key } = movie.videos.results[0];
      return key;
    } catch (e) {}
  };

  return (
    <SkeletonTheme color="#0f1214" highlightColor="#181d20">
      <div className="movie__overview">
        <div className="container__wrapper movie__overview-wrapper">
          <ModalVideo 
              channel="youtube" 
              isOpen={isOpenVideoModal}
              onClose={closeVideoModal} 
              videoId={getTrailerKey() || null} 
          />
          <Modal 
              center
              onClose={closeModal} 
              open={isOpenModal} 
              styles={modalStyle}
          >
            <h2>No Trailer Found</h2>
            <p>View in youtube instead</p>
            <a  
                className="modal__link"
                href={`${youtube + movie.original_title + getReleaseYear(movie.release_date)}`}
                target="_blank">
              Search in Youtube
            </a>
          </Modal>
            <div className="backdrop__container">
              {movie.id && (
                <img 
                    alt=""
                    className="backdrop__image"
                    src={movie.backdrop_path ? `${tmdbBackdropPath + movie.backdrop_path}` : imgBackground} 
                />
              )}
            </div>
            <div className="view">
              <div className="back__button">
                {movie.id ? (
                  <button 
                      className="button--back"
                      onClick={history.goBack}>
                    Back
                  </button>
                ) : <Skeleton width={50} /> }
              </div>
              <div className="view__wrapper">
                <div className="view__poster">
                  {movie.id ? (
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
                  ) : <Skeleton width={'100%'} height={'100%'}/>}
                </div>
                <div className="view__details">
                  {movie.id ? (
                    <>
                      <h1 className="view__title">
                        {movie.original_title || movie.original_name}
                        {movie.release_date && <span>{` (${getReleaseYear(movie.release_date)}) `}</span>}
                      </h1>
                      <p className="view__rating">
                        <span className="icon icon-star">★</span>
                        &nbsp;{movie.vote_average} Rating
                      </p>
                      <h4 className="view__overview-title">Overview</h4>
                      <p className="view__overview">{movie.overview}</p>
                    </>
                  ) : (
                    <>
                      <br/>
                      <Skeleton width={'70%'} height={50}/><br/>
                      <Skeleton width={180} height={20}/><br/>
                      <Skeleton width={150} height={20}/><br/>
                      <p>
                        <Skeleton count={4} />
                      </p>
                      <br/><br/>
                    </>
                  )}
                  <div className="view__actions">
                    {movie.id ? (
                      <>
                        <button className="button--primary" onClick={openVideoModal}>
                          Watch Trailer
                          <span className="icon icon-play">►</span>
                        </button>
                        <button 
                            className="button--outlined button--favorites"
                            onClick={onAddToFavorites}
                            style={{
                              background: found() ? '#ff2e4f' : 'transparent',
                              border: found() ? '1px solid #ff2e4f' : '1px solid #fff'
                            }}
                        >
                          {found() ? 'Remove From Favorites' : 'Add To Favorites'}
                          <span className="icon icon-heart">♥</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Skeleton width={220} height={60}/>
                        &nbsp;&nbsp;
                        <Skeleton width={220} height={60}/>
                      </>
                    )}
                  </div>
                </div>  
              </div>
            </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default withRouter(MovieOverview);
