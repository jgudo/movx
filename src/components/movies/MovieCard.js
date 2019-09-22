import React from 'react';
import { useDispatch } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import LazyLoad from 'react-lazy-load';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import ImageLoader from '../common/ImageLoader';
import imgPlaceholder from '../../images/img-placeholder.jpg';

import { addToFavorites, removeFromFavorites } from '../../actions/miscActions';

/* eslint camelcase: 0 */
const MovieCard = ({ favorites, movie, category }) => {
  const { 
    id,
    poster_path,
    original_name,
    original_title,
    release_date,
    first_air_date,
    vote_average,
    title
  } = movie;
  const dispatch = useDispatch();
  const tmdbPosterPath = 'https://image.tmdb.org/t/p/w185_and_h278_face/';
  
  const releaseYear = (date) => {
    if (date) return date.split('-')[0];
  };

  const favoriteFound = () => {
    return favorites.some(item => item.id === id);
  };

  const onAddToFavorites = () => {
    if (!favoriteFound()) dispatch(addToFavorites(movie));
    else dispatch(removeFromFavorites(id)); 
  };

  return (
    <SkeletonTheme color="#0f1214" highlightColor="#181d20">

      <div className="card">
        <Link to={`/view/${category}/${id}`}>
          <div className="card__image">
            {movie.id ? (
              <LazyLoad 
                  debounce={false}
                  offsetVertical={500}
              >
                <ImageLoader 
                    alt={original_title || original_name || title}
                    imgId={id} 
                    src={poster_path ? `${tmdbPosterPath + poster_path}` : imgPlaceholder} 
                />
              </LazyLoad>
            ) : <Skeleton width={'100%'} height={'100%'}/>}
          </div>
        </Link>
        <div className="card__details">
          {movie.id ? (
            <>
              <StarRatings
                  name="rating"
                  numberOfStars={10}
                  rating={vote_average}
                  starDimension="14px"
                  starRatedColor="yellow"
                  starSpacing="2px"
              />
              <h4>{original_title || original_name || title || 'Not Available'}</h4>
            </>
          ) : (
            <>
              <Skeleton width={'60%'} height={15}/><br/>
              <Skeleton width={'80%'} height={25}/><br/>
            </>
          )}
          <div className="card__footer">
            {movie.id ? (
              <>
                <p>
                  {releaseYear(release_date) || 
                  releaseYear(first_air_date) || 
                  'Not Available'}
                </p>
                <button
                    className="button--add-favorite"
                    onClick={onAddToFavorites}
                >
                <span 
                    className="icon icon-heart"
                    style={{
                      color: favoriteFound() ? '#ff2e4f' : '#5b6166'
                    }}>
                    ♥
                </span>
                </button>
                <div className="tooltip">
                  <span>{favoriteFound() ? 'Remove from favorites' : 'Add To Favorites'}</span>
                </div>
              </>
            ) : (
              <>
                <Skeleton width={30} height={15}/>
                <Skeleton width={15} height={15}/>
              </>
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default MovieCard;
