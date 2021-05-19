import MovieList from '@app/components/main/Movies/MovieList';
import { IRootState } from '@app/types/types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

const Casting = () => {
  const history = useHistory();
  const { id: actorId } = useParams<{ id: string }>();
  const { actor, casting } = useSelector((state: IRootState) => ({
    actor: state.people.current.actor,
    casting: state.people.current.casting
  }))

  const onClickLink = () => {
    history.push(`/view/person/profile/${actorId}/casting`);
    window.scrollTo(0, 0);
  };

  return casting.length === 0 ? null : (
    <div className="container__wrapper">
      <div className="movie__casts">
        <div className="movie__casts-content">
          <div className="movie__casts-wrapper">
            <div className="movie__casts-header header__title">
              <h1>Known For</h1>
            </div>
            <MovieList
              gridClass="movie__casts-grid"
              movies={casting.slice(0, 8)}
            />
            <div className="movie__casts-action">
              <button
                className="button--primary m-auto"
                onClick={onClickLink}
              >
                View All Casting
            </button>
            </div>
          </div>
          <div className="movie__details">
            <div className="movie__details-genre">
              <h4>Birthday</h4>
              <p>{actor?.birthday}</p>
            </div>
            <div>
              <h4>Known For</h4>
              <p>{actor?.known_for_department}</p>
            </div>
            <div>
              <h4>Gender</h4>
              <p>{actor?.gender === 1 ? 'Female' : 'Male'}</p>
            </div>
            {actor?.place_of_birth && (
              <div>
                <h4>Place of Birth</h4>
                <p>{actor?.place_of_birth}</p>
              </div>
            )}
            {actor?.also_known_as.length !== 0 && (
              <div>
                <h4>Also Known As</h4>
                {actor?.also_known_as && actor?.also_known_as.map(name => (
                  <p key={name}>{name}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Casting;
