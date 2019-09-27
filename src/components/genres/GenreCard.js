import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import action from 'images/action.jpg';
import adventure from 'images/adventure.jpg';
import animation from 'images/animation.jpg';
import comedy from 'images/comedy.jpg';
import crime from 'images/crime.jpg';
import documentary from 'images/documentary.jpg';
import drama from 'images/drama.jpg';
import family from 'images/family.jpg';
import fantasy from 'images/fantasy.jpg';
import history from 'images/history.jpg';
import horror from 'images/horror.jpg';
import music from 'images/music.jpg';
import mystery from 'images/mystery.jpg';
import romance from 'images/romance.jpg';
import science from 'images/science.jpg';
import tv from 'images/tv.jpg';
import thriller from 'images/thriller.jpg';
import war from 'images/war.jpg';
import western from 'images/western.jpg';


const GenreCard = (props) => {
  const { 
    id,
    name
  } = props.genre;
  const genreName = name.split(' ')[0].toLowerCase();

  const paths = {
    action,
    adventure,
    animation,
    comedy,
    crime,
    documentary,
    drama,
    family,
    fantasy,
    history,
    horror,
    music,
    mystery,
    romance,
    science,
    tv,
    thriller,
    war,
    western
  };

  return (
    <div 
        className="genre__card"
        style={{
          background: `url(${paths[genreName]})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
    >
      <Link to={`/genre/${name.toLowerCase().replace(' ', '-')}/${id}`}>
        <div className="genre__card-details">
          <h1>{name || 'Not Available'}</h1>
          <div className="genre__card-footer">
            <p>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

GenreCard.propTypes = {
  genre: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })
};

export default GenreCard;
