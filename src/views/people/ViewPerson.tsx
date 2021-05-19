import { Casting, PersonBiography } from '@app/components/main';
import { useDocumentTitle } from '@app/hooks';
import { fetchSelectedPerson } from '@app/redux/actions';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

const ViewPerson: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const actor = useSelector((state: IRootState) => state.people.current.actor);
  const dispatch = useDispatch();
  const actorId = match.params.id;

  useDocumentTitle(actor ? `${actor.name} Details` : 'View Person | MOVX');
  useEffect(() => {
    if (parseInt(actorId, 10) !== actor?.id) {
      dispatch(fetchSelectedPerson(actorId));
    }
  }, []);

  return actor ? (
    <>
      <PersonBiography />
      <Casting />
    </>
  ) : <PersonBiography />;
};

export default ViewPerson;
