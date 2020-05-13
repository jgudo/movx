import React from 'react';
import { withRouter } from 'react-router-dom';

import PeopleList from '../people/PeopleList';
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
          <br/>
          <PeopleList 
              people={casts.slice(0, 12)} 
              gridClass="movie__casts-grid" 
          />
          <br/>
          <br/>
          {casts.length >= 1 ? (
            <button 
                className="button--primary button--block m-auto"
                onClick={onClickLink}
            >
              View All Casts
            </button>
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
