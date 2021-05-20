import { MovieList } from '@app/components/main';
import { useDocumentTitle } from '@app/hooks';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

const Casting: React.FC<RouteComponentProps> = ({ history }) => {
  const { actor, casting } = useSelector((state: IRootState) => ({
    actor: state.people.current.actor,
    casting: state.people.current.casting,
  }));

  useDocumentTitle('Castings | MOVX');
  useEffect(() => {
    if (!actor) {
      history.goBack();
    }
  }, []);

  return !actor ? null : (
    <>
      <div className="posters__banner">
        <img src="/background.jpg" alt="" />
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
        <div className="movie__header">
          <div className="movie__header-title">
            <h1>Casted Movies</h1>
            <h3>{casting.length} Movies</h3>
          </div>
        </div>
        <MovieList movies={casting} />
      </div>
    </>
  );
};

export default Casting;
