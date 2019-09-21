import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import ImageLoader from '../common/ImageLoader';
import imgPlaceholder from '../../images/img-placeholder.jpg';

import { addToFavorites, removeFromFavorites } from '../../actions/actions';

/* eslint camelcase: 0 */
const MovieCard = (props) => {
  const { 
    id,
    poster_path,
    original_name,
    original_title,
    release_date,
    first_air_date,
    vote_average,
    title
  } = props.movie;
  const tmdbPosterPath = 'https://image.tmdb.org/t/p/w185_and_h278_face/';
  
  const releaseYear = (date) => {
    if (date) return date.split('-')[0];
  };

  const favoriteFound = () => {
    return props.favorites.some(item => item.id === id);
  };

  const onAddToFavorites = () => {
    if (!favoriteFound()) props.addToFavorites(props.movie);
    else props.removeFromFavorites(id); 
  };

  return (
    <div className="card">
      <Link to={`/view/${props.category}/${id}`}>
        <div className="card__image">
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
        </div>
      </Link>
      <div className="card__details">
        <StarRatings
            name="rating"
            numberOfStars={10}
            rating={vote_average}
            starDimension="14px"
            starRatedColor="yellow"
            starSpacing="2px"
        />
        <h4>{original_title || original_name || title || 'Not Available'}</h4>
        <div className="card__footer">
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
        </div>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  addToFavorites: PropTypes.func,
  favorites: PropTypes.arrayOf(PropTypes.object),
  movie: PropTypes.object,
  removeFromFavorites: PropTypes.func
};

const mapStateToProps = ({ favorites }) => ({
  favorites
});

const mapDispatchToProps = dispatch => ({
  addToFavorites: favorites => dispatch(addToFavorites(favorites)),
  removeFromFavorites: id => dispatch(removeFromFavorites(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
