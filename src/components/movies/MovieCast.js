import React from 'react';
import { withRouter } from 'react-router-dom';

import PeopleCard from '../people/PeopleCard';
import MovieDetails from './MovieDetails';

const MovieCast = ({ casts, movie, keywords, history, match }) => {
  const onClickLink = () => {
    history.push(`/view/movie/${match.params.id}/casts`);
    window.scrollTo(null, 0);
  };

  return (
    <div className="movie__casts">
      <div className="container__wrapper movie__casts-content">
        <div className="movie__casts-wrapper">
          <div className="movie__casts-header header__title">
            <h1>Top Billed Casts</h1>
          </div>
          {casts.length >= 1 ? (
            <>
              <div className="movie__casts-grid">
                {casts.map((person, index) => index < 12 && (
                  <PeopleCard 
                      category="people"
                      key={person.id + person.name}
                      people={person}
                  />
                ))}
              </div>
              <br/>
              <button 
                  className="button--primary button--block m-auto"
                  onClick={onClickLink}
              >
                View All Casts
              </button>
            </>
          ) : (
            <p style={{ opacity: '.7', fontStyle: 'italic' }}>
              No casts found for this movie.
            </p>
          )}
        </div>
        <MovieDetails 
            keywords={keywords}
            movie={movie}
        />
      </div>   
    </div>
  );
};

export default withRouter(MovieCast);
