import React from 'react';
import { useDispatch } from 'react-redux';

import { addToFavorites, removeFromFavorites } from '../../actions/miscActions';

const SliderItem = ({ movie, favorites, history }) => {
  const dispatch = useDispatch();
  const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
  const tmdbBackdropPath = 'https://image.tmdb.org/t/p/original';
  
  const found = () => {
    return favorites.some(item => item.id === movie.id);
  };

  const onAddToFavorites = () => {
    if (!found()) dispatch(addToFavorites(movie));
    else dispatch(removeFromFavorites(movie.id)); 
  };

  return (
    <div className="movie__slider-wrapper">
      <img 
          alt=""
          className="movie__slider-backdrop"
          src={tmdbBackdropPath + movie.backdrop_path} 
      />
      <div className="movie__slider-content">
        <div className="movie__slider-description">
          <h1>{movie.original_title}</h1>
          <p>
            <span className="icon icon-star">★</span>
            &nbsp;{movie.vote_average} Rating
          </p>
          <p className="view__overview">{movie.overview}</p>
          <br/>
          <div className="view__actions">
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
          </div>
        </div>
        <div className="view__poster">
          <div className="view__rank">
            <h6>
              <span className="icon icon-star">★</span>
              Popular
              <span className="icon icon-star">★</span>
            </h6>
          </div>
          <img 
              alt={movie.original_title || movie.original_name || movie.title}
              src={movie.poster_path ? `${tmdbPosterPath + movie.poster_path}` : '/images/img-placeholder.jpg'}
          />
        </div>
      </div>
    </div>
  );
}; 

export default SliderItem;
