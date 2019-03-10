import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import ImageLoader from '../layout/ImageLoader';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w185_and_h278_face/';

/* eslint-disable */
const PeopleCard = (props) => {
  const { 
    id,
    profile_path,
    name,
    known_for
  } = props.people;

  return (
    <div className="card">
      <Link to="">
        <div className="card__image">
          <LazyLoad 
              width={180}
              height={250}
              debounce={false}
              offsetVertical={500}
            >
              <ImageLoader 
                  alt={name}
                  imgId={id} 
                  src={`${tmdbPosterPath + profile_path}`} 
              />
          </LazyLoad>
        </div>
      </Link>
      <div className="card__details">
        <h4>{name || 'Not Available'}</h4>
        <div className="card__footer">
          <p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PeopleCard;
