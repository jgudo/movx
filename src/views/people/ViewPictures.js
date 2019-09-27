import React from 'react';
import { useSelector } from 'react-redux';

import PersonProfiles from 'components/people/PersonProfiles';
import imgBackground from 'images/background.jpg';

const ViewPictures = ({ history }) => {
  const actor = useSelector(state => state._people.person.actor);

  return (
    <>
      <div className="posters__banner">
        <img src={imgBackground} alt=""/>
        <div className="posters__banner-content">
          <h1>{actor.name}</h1>
          <button 
              className="button--back"
              onClick={history.goBack}>
            Back
          </button>
        </div>
      </div>
      <div className="container__wrapper">
        <PersonProfiles
            id={actor.id}
            posters={actor.images.profiles} 
        />
      </div>
    </>
  );
};

export default ViewPictures;
