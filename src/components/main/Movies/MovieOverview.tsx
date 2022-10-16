import ImageLoader from '@app/components/common/Loader/ImageLoader';
import { getCSSVar, getYear } from '@app/helpers/helperFunctions';
import useFavorites from '@app/hooks/useFavorites';
import { IRootState } from '@app/types/types';
import React, { useState } from 'react';
// @ts-ignore
import LazyLoad from 'react-lazy-load';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// @ts-ignore
import ModalVideo from 'react-modal-video';
import { useSelector } from 'react-redux';
import Modal from 'react-responsive-modal';
import { Link, useHistory } from 'react-router-dom';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
const tmdbBackdropPath = 'https://image.tmdb.org/t/p/original';

const MovieOverview = () => {
  const movie = useSelector((state: IRootState) => state.movies.current.movie);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenVideoModal, setOpenVideoModal] = useState(false);
  const history = useHistory();
  const { isFavorite, addToFavorites } = useFavorites();

  const youtube = 'https://www.youtube.com/results?search_query=';
  const modalStyle = {
    modal: {
      background: '#0f1214',
      padding: '50px',
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
    if (!movie) return;

    if (movie.videos.results.length >= 1) {
      setOpenVideoModal(true);
    } else {
      setOpenModal(true);
    }
  };

  const closeVideoModal = () => setOpenVideoModal(false);

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
        playlist={!movie ? null : movie.videos.results[0] ? movie.videos.results.map(video => video.key) : null}
        videoId={!movie ? null : movie.videos.results[0] ? movie.videos.results[0].key : null}
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
          href={`${youtube + movie?.original_title + getYear(movie?.release_date || '0')}`}
          target="_blank">
          Search in Youtube
        </a>
      </Modal>
      <div className="movie__overview">
        <div className="container movie__overview-wrapper">
          {movie?.id && (
            <div className="backdrop__container">
              <img
                alt=""
                className="backdrop__image"
                src={movie?.backdrop_path ? `${tmdbBackdropPath + movie?.backdrop_path}` : '/background.jpg'}
              />
            </div>
          )}
          <div className="view">
            <div className="back__button">
              {movie ? (
                <button
                  className="button--back"
                  onClick={history.goBack}>
                  Back
                </button>
              ) : <Skeleton width={50} />}
            </div>
            <div className="view__wrapper">
              <div className="view__poster">
                {movie?.id ? (
                  <LazyLoad
                    debounce={false}
                    offsetVertical={500}
                  >
                    <ImageLoader
                      alt={movie.original_title || movie.original_name || movie.title}
                      imgId={movie.id}
                      src={movie.poster_path ? `${tmdbPosterPath + movie.poster_path}` : '/img-placeholder.jpg'}
                    />
                  </LazyLoad>
                ) : <Skeleton width={'100%'} height={'100%'} />}
              </div>
              <div className="view__details">
                <h1 className="view__title">
                  {movie ? (
                    <>
                      {movie.original_title || movie.original_name}
                      {movie.release_date && <span>{` (${getYear(movie.release_date)}) `}</span>}
                    </>
                  ) : <Skeleton width={250} />}
                </h1>
                <p className="view__rating mb-0">
                  {movie ? (
                    <><i className="fa fa-star" />&nbsp;{movie.vote_average?.toFixed(1)} Rating</>
                  ) : <Skeleton width={180} />}
                </p>
                {(movie && movie.genres.length >= 1) &&
                  <i className="mt-0 text-subtle">
                    {movie.genres.map((genre, index) => (
                      <Link className="view__genre" key={`${movie.id}_genre${genre.id}`} to={`/genre/${genre.name}/${genre.id}`}>
                          {genre.name} {(index < (movie.genres.length - 1)) && '/ '}
                      </Link>
                    ))}
                  </i>
                }
                <h4 className="view__overview-title">
                  {movie ? 'Overview' : <Skeleton width={150} />}
                </h4>
                <p className="view__overview">
                  {movie ? movie.overview : <Skeleton count={4} />}
                </p>
                <div className="view__actions">
                  {movie && (
                    <>
                      <button className="button--primary" onClick={openVideoModal}>
                        Watch Trailer
                        &nbsp;&nbsp;
                          <i className="fa fa-play" />
                      </button>
                        &nbsp;
                        <button
                        className="button--favorites"
                        onClick={() => addToFavorites(movie)}
                        style={{
                          color: isFavorite(movie.id) ? '#fff' : getCSSVar('--text-color'),
                          background: isFavorite(movie.id) ? '#ff2e4f' : 'transparent',
                          border: isFavorite(movie.id) ? '1px solid #ff2e4f' : `1px solid ${getCSSVar('--text-color')}`
                        }}
                      >
                        {isFavorite(movie.id) ? 'Unfavorite' : 'Favorite'}
                          &nbsp;&nbsp;
                          <i
                          className="fa fa-heart"
                          style={{
                            color: isFavorite(movie.id) ? '#fff' : getCSSVar('--text-color')
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

export default MovieOverview;
