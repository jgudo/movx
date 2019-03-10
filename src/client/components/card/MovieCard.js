import React from 'react';
import LazyLoad from 'react-lazy-load';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageLoader from '../layout/ImageLoader';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';

/* eslint-disable */
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

  const releaseYear = (date) => {
    if (date) return date.split('-')[0];
  };

  return (
    <div className="movie__card">
      <Link to={`/${props.category}/${id}/${original_title || original_name || title}`} exact>
        <div className="movie__card-image">
          <LazyLoad 
              width={180}
              height={250}
              debounce={false}
              offsetVertical={500}
            >
              <ImageLoader 
                  alt={original_title || original_name || title}
                  imgId={id} 
                  src={`${tmdbPosterPath + poster_path}`} 
              />
          </LazyLoad>
        </div>
      </Link>
      <div className="movie__card-details">
        <StarRatings
          rating={vote_average}
          starRatedColor="yellow"
          numberOfStars={10}
          starDimension="14px"
          starSpacing="2px"
          name='rating'
        />
        <h4>{original_title || original_name || title || 'Not Available'}</h4>
        <div className="movie__card-footer">
          <p>
            {releaseYear(release_date) || 
            releaseYear(first_air_date) || 
            'Not Available'}
          </p>
          <FontAwesomeIcon 
              icon={['fa', 'heart']} 
          />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
