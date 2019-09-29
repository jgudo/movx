import React from 'react';
import { useSelector } from 'react-redux';
import imgBackground from 'images/background.jpg';
import MovieCard from 'components/movies/MovieCard';

const ViewPictures = ({ history }) => {
  const { actor, casting, favorites } = useSelector(state => ({
    actor: state._people.person.actor,
    casting: state._people.person.casting,
    favorites: state._misc.favorites
  }));

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
        <div className="movie__header">
          <div className="movie__header-title">
            <h1>Casted Movies</h1>
            <h3>{casting.length} Movies</h3>
          </div>
        </div>  
        <div className="movie__wrapper">
          {casting.map((movie, index) => (
            <MovieCard 
                category="movie"
                favorites={favorites}
                key={`${movie.id}_${index}`}
                movie={movie} 
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewPictures;
