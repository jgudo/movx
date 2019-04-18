import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import ImageLoader from '../layout/ImageLoader';
import imgPlaceholder from '../../images/placeholder.jpg';

/* eslint camelcase: 0 */
const PeopleCard = (props) => {
  const { 
    id,
    profile_path,
    name,
    character
  } = props.people;
  const tmdbPosterPath = 'https://image.tmdb.org/t/p/w185_and_h278_face/';

  return (
    <div className="card people__card">
      <Link to={`/view/person/profile/${id}`}>
        <div className="card__image">
          <LazyLoad 
              debounce={false}
              offsetVertical={500}
          >
            <ImageLoader 
                alt={name}
                imgId={id} 
                src={profile_path ? `${tmdbPosterPath + profile_path}` : imgPlaceholder} 
            />
          </LazyLoad>
        </div>
      </Link>
      <div className="card__details">
        <h4>{name || 'Not Available'}</h4>
        {character && <p className="card__character">{`(${character})`}</p> }
      </div>
    </div>
  );
}

PeopleCard.propTypes = {
  people: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    known_for_department: PropTypes.string,
    profile_path: PropTypes.string
  })
};

export default PeopleCard;
