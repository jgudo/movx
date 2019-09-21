import React from 'react';
import { connect } from 'react-redux';

import PersonProfiles from '../../components/people/PersonProfiles';
import imgBackground from '../../images/background.jpg';

const ViewPictures = ({ history, actor, actor: { images } }) => (
  <div className="container-full">
    <div className="posters__banner">
      <img src={imgBackground} alt=""/>
      <div className="posters__banner-content">
        <h1>{actor.name}</h1>
        <button 
            className="button--back"
            onClick={() => history.goBack()}>
          Back
        </button>
      </div>
    </div>
    <div className="container__wrapper">
      <PersonProfiles
          id={actor.id}
          posters={images.profiles} 
      />
    </div>
  </div>
);

const mapStateToProps = ({ person }) => ({
  actor: person.actor
});

export default connect(mapStateToProps)(ViewPictures);
