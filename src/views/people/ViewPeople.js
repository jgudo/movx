import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContentLoader from '../../components/common/ContentLoader';
import Casting from '../../components/people/Casting';
import PersonBiography from '../../components/people/PersonBiography';

import { fetchSelectedPerson } from '../../actions/peopleActions';

// helpers
import { isEmpty } from '../../helpers/helperFunctions';

const ViewPeople = (props) => {
  const { actor, casting, isLoading } = useSelector(state => ({
    actor: state._people.person.actor,
    casting: state._people.person.casting,
    isLoading: state._misc.isLoading
  }));
  const dispatch = useDispatch();
  const actorId = props.match.params.id;

  useEffect(() => { 
    if (parseInt(actorId, 10) !== props.actor.id) {
      dispatch(fetchSelectedPerson(actorId));
    }
  }, []);

  return (
    <>
      {isLoading && <ContentLoader />}
      {(!isLoading && !isEmpty(actor)) && (
        <div className="container-full">
          <PersonBiography 
              actor={actor}
              id={actorId}
          />
          {casting.length >= 1 && (
            <div className="container__wrapper">
              <Casting 
                  actor={actor} 
                  casting={casting} 
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewPeople;
