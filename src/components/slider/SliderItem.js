import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addToFavorites, removeFromFavorites } from 'actions/miscActions';

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
          <p className="movie__slider-rating">
            <i className="fa fa-star" style={{color: 'yellow'}}/>
            &nbsp;{movie.vote_average} Rating
          </p>
          <p className="view__overview">{movie.overview}</p>
          <br/>
          <div className="movie__slider-button">
            <button 
                className="button--primary"
                onClick={() => history.push(`/view/movie/${movie.id}`)}
            >
              View Movie
            </button>
          </div>
        </div>
        <div className="view__poster">
          <img 
              alt={movie.original_title || movie.original_name || movie.title}
              src={movie.poster_path ? `${tmdbPosterPath + movie.poster_path}` : '/images/img-placeholder.jpg'}
          />
        </div>
      </div>
    </div>
  );
}; 

export default withRouter(SliderItem);
