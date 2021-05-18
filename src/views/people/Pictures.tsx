import imgBackground from '@app/assets/images/background.jpg';
import PersonProfiles from '@app/components/people/PersonProfiles';
import useDocumentTitle from '@app/hooks/useDocumentTitle';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

const Pictures: React.FC<RouteComponentProps> = ({ history }) => {
  const actor = useSelector((state: IRootState) => state.people.current.actor);

  useDocumentTitle('Profile Pictures');
  useEffect(() => {
    if (!actor) {
      history.goBack();
    }
  }, []);

  return !actor ? null : (
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
        <PersonProfiles />
      </div>
    </>
  );
};

export default Pictures;
