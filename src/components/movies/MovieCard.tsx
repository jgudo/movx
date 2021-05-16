import imgPlaceholder from '@app/assets/images/img-placeholder.jpg';
import ImageLoader from '@app/components/common/ImageLoader';
import { getCSSVar, getYear } from '@app/helpers/helperFunctions';
import useFavorites from '@app/hooks/useFavorites';
import { IMovieData } from '@app/types/types';
import React from 'react';
// @ts-ignore
import LazyLoad from 'react-lazy-load';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// @ts-ignore
import StarRatings from 'react-star-ratings';


interface IProps {
  movie: IMovieData | null;
  category: 'movie' | 'tv';
  isLoading: boolean;
  favorites: IMovieData[];
}

const MovieCard: React.FC<IProps> = ({ movie, favorites, category, isLoading }) => {
  const dispatch = useDispatch();
  const tmdbPosterPath = 'https://image.tmdb.org/t/p/w185_and_h278_face/';
  const { isFavorite, addToFavorites } = useFavorites();

  const onClickCard = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // prevent clicking of movie cards if loading
    if (isLoading) {
      e.preventDefault();
    }
  };

  return (
    <SkeletonTheme
      color={getCSSVar('--skeleton-theme-color')}
      highlightColor={getCSSVar('--skeleton-theme-highlight')}
    >
      <div className="card">
        <Link to={`/view/${category}/${movie?.id}`} onClick={onClickCard}>
          <div className="card__image">
            {movie ? (
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
        </Link>
        <div className="card__details">
          {movie && (
            <StarRatings
              name="rating"
              numberOfStars={10}
              rating={movie.vote_average}
              starDimension="14px"
              starRatedColor={getCSSVar('--star-color')}
              starSpacing="2px"
            />
          )}
          <h4>
            {movie ? (movie.original_title || movie.original_name || movie.title || 'Not Available') : (
              <Skeleton width={'80%'} height={15} />
            )}
          </h4>
          <div className="card__footer">
            <p>
              {movie ? (
                getYear(movie.release_date) || getYear(movie.first_air_date) || 'N/A'
              ) : (
                <Skeleton width={50} />
              )}
            </p>
            {movie && (
              <>
                <button
                  className="button--add-favorite"
                  onClick={() => addToFavorites(movie)}
                >
                  <i
                    className="fa fa-heart"
                    style={{
                      color: isFavorite(movie.id) ? '#ff2e4f' : '#5b6166'
                    }} />

                </button>
                <div className="tooltip">
                  <span>{isFavorite(movie.id) ? 'Remove from favorites' : 'Add To Favorites'}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default MovieCard;
