import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const GenreCard = (props) => {
  const { 
    id,
    name
  } = props.genre;

  const paths = {
    action: '/images/action.jpg',
    adventure: '/images/adventure.jpg',
    animation: '/images/animation.jpg',
    comedy: '/images/comedy.jpg',
    crime: '/images/crime.jpg',
    documentary: '/images/documentary.jpg',
    drama: '/images/drama.jpg',
    family: '/images/family.jpg',
    fantasy: '/images/fantasy.jpg',
    history: '/images/history.jpg',
    horror: '/images/horror.jpg',
    music: '/images/musical.jpg',
    mystery: '/images/mystery.jpg',
    romance: '/images/romance.jpg',
    science: '/images/science-fiction.jpg',
    tv: '/images/tv.jpg',
    thriller: '/images/thriller.jpg',
    war: '/images/war.jpg',
    western: '/images/western.jpg'
  };

  const genreName = name.split(' ')[0].toLowerCase();

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
