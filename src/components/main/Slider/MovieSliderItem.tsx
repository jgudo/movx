import imgPlaceholder from '@app/assets/images/img-placeholder.jpg';
import ImageLoader from '@app/components/common/Loader/ImageLoader';
import { getCSSVar } from '@app/helpers/helperFunctions';
import { IMovieData } from '@app/types/types';
import React from 'react';
// @ts-ignore
import LazyLoad from 'react-lazy-load';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';


const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
const tmdbBackdropPath = 'https://image.tmdb.org/t/p/original';

const MovieSliderItem: React.FC<{ movie: IMovieData }> = ({ movie }) => {
  const history = useHistory();

  return (
    <SkeletonTheme
      color={getCSSVar('--skeleton-theme-color')}
      highlightColor={getCSSVar('--skeleton-theme-highlight')}
    >
      <div className="container__wrapper movie__slider-wrapper">
        {movie.id && (
          <div className="movie__slider-backdrop">
            <img
              alt=""
              src={tmdbBackdropPath + movie.backdrop_path}
            />
          </div>
        )}
        <div className="movie__slider-content">
          <div className="movie__slider-description">
            <h1>
              {movie.original_title || <Skeleton width={'50%'} />}
            </h1>
            <p className="movie__slider-rating">
              {movie.vote_average ? (
                <>
                  <i className="fa fa-star" style={{ color: 'yellow' }} />
                  &nbsp;{movie.vote_average} Rating
                </>
              ) : (
                <Skeleton width={'30%'} />
              )}
            </p>
            <p className="view__overview">
              {movie.overview || <Skeleton count={4} />}
            </p>
            <br />
            <div className="movie__slider-button">
              {movie.id ? (
                <button
                  className="button--primary"
                  onClick={() => history.push(`/view/movie/${movie.id}`)}
                >
                  View Movie
                </button>
              ) : (
                <Skeleton width={150} height={50} />
              )}
            </div>
          </div>
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
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default MovieSliderItem;
