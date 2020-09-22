import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Casting from 'components/people/Casting';
import PersonBiography from 'components/people/PersonBiography';
import { fetchSelectedPerson } from 'actions/peopleActions';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { isEmpty } from 'helpers/helperFunctions';

const ViewPeople = (props) => {
  const { actor, casting, favorites, isLoading } = useSelector(state => ({
    actor: state._people.person.actor,
    casting: state._people.person.casting,
    isLoading: state._misc.isLoading,
    favorites: state._misc.favorites
  }));
  const dispatch = useDispatch();
  const actorId = props.match.params.id;

  useDocumentTitle(actor.id ? `${actor.name} Details` : 'View Person | MOVX');
  useEffect(() => {
    if (parseInt(actorId, 10) !== actor.id) {
      dispatch(fetchSelectedPerson(actorId));
    }
  }, []);

  return !isLoading ? (
    <>
      <PersonBiography actor={actor} />
      {casting.length >= 1 && (
        <div className="container__wrapper">
          <Casting
            actor={actor}
            casting={casting}
            favorites={favorites}
          />
        </div>
      )}
    </>
  ) : <PersonBiography actor={{}} />;
};

export default ViewPeople;
