import ImageLoader from '@app/components/common/Loader/ImageLoader';
import { getCSSVar } from '@app/helpers/helperFunctions';
import { IMovieData, IRootState } from '@app/types/types';
import React from 'react';
import { HiStar } from 'react-icons/hi';
// @ts-ignore
import LazyLoad from 'react-lazy-load';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
const tmdbBackdropPath = 'https://image.tmdb.org/t/p/original';

const MovieSliderItem: React.FC<{ movie: IMovieData | null }> = ({ movie }) => {
  const history = useHistory();
  const genres = useSelector((state: IRootState) => state.genre.genres);

  return (
    <SkeletonTheme
      color={getCSSVar('--skeleton-theme-color')}
      highlightColor={getCSSVar('--skeleton-theme-highlight')}
    >
      <div className="container__wrapper movie__slider-wrapper">
        {movie && (
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
              {movie?.original_title || <Skeleton width={'50%'} />}
            </h1>
            <p className="movie__slider-rating">
              {movie?.vote_average ? (
                <>
                  <HiStar className="movie__slider-rating-star" />
                  &nbsp;{movie.vote_average} Rating
                </>
              ) : (
                <Skeleton width={'30%'} />
              )}
            </p>
            <p className="movie__slider-genre">
              {movie?.genre_ids ? movie.genre_ids?.map(a => (
                <Link className="movie__slider-genre-pill" to={`/genre/${genres.find(b => b.id === a)?.name}/${a}`}>
                  {genres.find(b => b.id === a)?.name}
                </Link>
              )) : (
                <Skeleton width={'25%'} />
              )}
            </p>
            <p className="view__overview mt-0">
              {movie?.overview || <Skeleton count={4} />}
            </p>
            <br />
            <div className="movie__slider-button">
              {movie?.id ? (
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
            {movie ? (
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
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default MovieSliderItem;
