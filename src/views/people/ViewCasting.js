import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import imgBackground from 'images/background.jpg';
import MovieList from 'components/movies/MovieList';

import useDocumentTitle from 'hooks/useDocumentTitle';
import { isEmpty } from 'helpers/helperFunctions';

const ViewPictures = ({ history }) => {
  const { actor, casting, favorites } = useSelector(state => ({
    actor: state._people.person.actor,
    casting: state._people.person.casting,
    favorites: state._misc.favorites
  }));

  useDocumentTitle('Castings | MOVX');
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
        <div className="movie__header">
          <div className="movie__header-title">
            <h1>Casted Movies</h1>
            <h3>{casting.length} Movies</h3>
          </div>
        </div>
        <MovieList
          category="movie"
          favorites={favorites}
          movies={casting}
        />
      </div>
    </>
  );
};

export default ViewPictures;
