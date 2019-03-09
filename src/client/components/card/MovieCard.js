import React from 'react';
import LazyLoad from 'react-lazy-load';
import StarRatings from 'react-star-ratings';
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
    vote_average
  } = props.movie;

  const releaseYear = (date) => {
    if (date) return date.split('-')[0];
  };

  return (
    <div className="movie__card">
      <div className="movie__card-image">
        <LazyLoad 
            width={180}
            height={250}
            debounce={false}
            offsetVertical={500}
          >
            <ImageLoader 
                alt={original_name || original_title}
                imgId={id} 
                src={`${tmdbPosterPath + poster_path}`} 
            />
        </LazyLoad>
      </div>
      <div className="movie__card-details">
        <StarRatings
          rating={vote_average}
          starRatedColor="yellow"
          numberOfStars={10}
          starDimension="14px"
          starSpacing="2px"
          name='rating'
        />
        <h4>{original_title || original_name || 'Not Available'}</h4>
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
