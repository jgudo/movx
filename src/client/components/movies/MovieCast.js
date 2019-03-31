import React from 'react';
import { withRouter } from 'react-router-dom';

import PeopleCard from '../people/PeopleCard';

const MovieCast = ({ casts, history, match }) => {
  const onClickLink = () => {
    history.push(`/view/movie/${match.params.id}/casts`);
    window.scrollTo(null, 0);
  };

  return (
    <div className="movie__casts-wrapper">
      <div className="movie__casts-header">
        <h1>Top Billed Casts</h1>
      </div>
      {casts.length >= 1 ? (
        <React.Fragment>
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
              className="button--primary button--block"
              onClick={onClickLink}
          >
            View All Casts
          </button>
        </React.Fragment>
      ) : (
        <p style={{ opacity: '.7', fontStyle: 'italic' }}>
          No casts found for this movie.
        </p>
      )}
    </div>    
  );
};

export default withRouter(MovieCast);
