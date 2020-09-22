import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import LazyLoad from 'react-lazy-load';
import { toast } from 'react-toastify';
import ModalVideo from 'react-modal-video';
import Modal from 'react-responsive-modal';
import ImageLoader from '../common/ImageLoader';
import imgPlaceholder from 'images/img-placeholder.jpg';
import imgBackground from 'images/background.jpg';

// actions
import { addToFavorites, removeFromFavorites } from 'actions/miscActions';

import { getYear, isEmpty, getCSSVar } from 'helpers/helperFunctions';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
const tmdbBackdropPath = 'https://image.tmdb.org/t/p/original';

const MovieOverview = ({ movie, favorites, history }) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenVideoModal, setOpenVideoModal] = useState(false);
  const dispatch = useDispatch();

  const youtube = 'https://www.youtube.com/results?search_query=';
  const modalStyle = {
    modal: {
      background: '#0f1214',
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

  const foundOnFavorites = () => favorites.some(item => item.id === movie.id);

  const onAddToFavorites = () => {
    if (!foundOnFavorites()) {
      dispatch(addToFavorites(movie));
      toast.dismiss();
      toast.dark(`${movie.original_name || movie.original_title} \n\r Added to favorites`);
    } else {
      dispatch(removeFromFavorites(movie.id));
      toast.dismiss();
      const options = {
        autoClose: 5000,
        progressStyle: { backgroundColor: '#DC143C' }
      };
      toast.dark(`${movie.original_name || movie.original_title} \n\r removed from favorites`, options);
    }
  };

  const closeVideoModal = () => setOpenVideoModal(false);

  const openModal = () => setOpenModal(false);

  const closeModal = () => setOpenModal(false);

  return (
    <SkeletonTheme
      color={getCSSVar('--skeleton-theme-color')}
      highlightColor={getCSSVar('--skeleton-theme-highlight')}
    >
      <ModalVideo
        channel="youtube"
        modalVideo="movie-modal-video"
        isOpen={isOpenVideoModal}
        onClose={closeVideoModal}
        playlist={isEmpty(movie) ? null : movie.videos.results[0] ? movie.videos.results.map(video => video.key) : null}
        videoId={isEmpty(movie) ? null : movie.videos.results[0] ? movie.videos.results[0].key : null}
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
          href={`${youtube + movie.original_title + getYear(movie.release_date)}`}
          target="_blank">
          Search in Youtube
        </a>
      </Modal>
      <div className="movie__overview">
        <div className="container movie__overview-wrapper">
          {movie.id && (
            <div className="backdrop__container">
              <img
                alt=""
                className="backdrop__image"
                src={movie.backdrop_path ? `${tmdbBackdropPath + movie.backdrop_path}` : imgBackground}
              />
            </div>
          )}
          <div className="view">
            <div className="back__button">
              {movie.id ? (
                <button
                  className="button--back"
                  onClick={history.goBack}>
                  Back
                </button>
              ) : <Skeleton width={50} />}
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
                ) : <Skeleton width={'100%'} height={'100%'} />}
              </div>
              <div className="view__details">
                <h1 className="view__title">
                  {movie.id ? (
                    <>
                      {movie.original_title || movie.original_name}
                      {movie.release_date && <span>{` (${getYear(movie.release_date)}) `}</span>}
                    </>
                  ) : <Skeleton width={250} />}
                </h1>
                <p className="view__rating mb-0">
                  {movie.id ? (
                    <><i className="fa fa-star" />&nbsp;{movie.vote_average} Rating</>
                  ) : <Skeleton width={180} />}
                </p>
                {(movie.id && movie.genres.length >= 1) &&
                  <p className="mt-0 text-subtle">
                    {movie.genres.map((genre, index) => (
                      <span key={`${movie.id}_genre${genre.id}`}>{genre.name} {(index < (movie.genres.length - 1)) && '/ '}</span>
                    ))}
                  </p>
                }
                <h4 className="view__overview-title">
                  {movie.id ? 'Overview' : <Skeleton width={150} />}
                </h4>
                <p className="view__overview">
                  {movie.id ? movie.overview : <Skeleton count={4} />}
                </p>
                <div className="view__actions">
                  {movie.id && (
                    <>
                      <button className="button--primary" onClick={openVideoModal}>
                        Watch Trailer
                        &nbsp;&nbsp;
                          <i className="fa fa-play" />
                      </button>
                        &nbsp;
                        <button
                        className="button--favorites"
                        onClick={onAddToFavorites}
                        style={{
                          color: foundOnFavorites() ? '#fff' : getCSSVar('--text-color'),
                          background: foundOnFavorites() ? '#ff2e4f' : 'transparent',
                          border: foundOnFavorites() ? '1px solid #ff2e4f' : `1px solid ${getCSSVar('--text-color')}`
                        }}
                      >
                        {foundOnFavorites() ? 'Unfavorite' : 'Favorite'}
                          &nbsp;&nbsp;
                          <i
                          className="fa fa-heart"
                          style={{
                            color: foundOnFavorites() ? '#fff' : getCSSVar('--text-color')
                          }}
                        />
                      </button>
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
