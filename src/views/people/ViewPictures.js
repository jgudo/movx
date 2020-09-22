import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PersonProfiles from 'components/people/PersonProfiles';
import useDocumentTitle from 'hooks/useDocumentTitle';
import imgBackground from 'images/background.jpg';

import { isEmpty } from 'helpers/helperFunctions';

const ViewPictures = ({ history }) => {
  const actor = useSelector(state => state._people.person.actor);

  useDocumentTitle('Profile Pictures');
  useEffect(() => {
    if (isEmpty(actor)) {
      history.goBack();
    }
  }, []);

  return !isEmpty(actor) && (
    <>
      <div className="posters__banner">
        <img src={imgBackground} alt="" />
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
