import React from 'react';
import { connect } from 'react-redux';
import imgBackground from '../../images/background.jpg';

import MovieCard from '../movies/MovieCard';

const ViewPictures = ({ actor, casting, history }) => (
  <div className="container pt-0 mt-0">
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
              key={`${movie.id}_${index}`}
              movie={movie} 
          />
        ))}
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ person }) => ({
  actor: person.actor,
  casting: person.casting
});

export default connect(mapStateToProps)(ViewPictures);
