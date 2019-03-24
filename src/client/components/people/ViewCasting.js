import React from 'react';
import { connect } from 'react-redux';

import MovieCard from '../movies/MovieCard';

const ViewPictures = (props) => {
  const { actor, casting } = props;
  const goPreviousPage = () => {
    props.history.goBack();
  };

  return (
    <div className="container pt-0 mt-0">
      <div className="posters__banner">
        <img src="/images/background.jpg" alt=""/>
        <div className="posters__banner-content">
          <h1>
            {actor.name} &nbsp;
          </h1>
          <button 
              className="button--back"
              onClick={goPreviousPage}>
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
          {casting.map((movie, index) => {
            return (
              <MovieCard 
                  category="movie"
                  key={`${movie.id}_${index}`}
                  movie={movie} 
              />
            )
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ person }) => ({
  actor: person.actor,
  casting: person.casting
});

export default connect(mapStateToProps)(ViewPictures);
