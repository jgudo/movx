import React from 'react';
import { withRouter } from 'react-router-dom';

import PeopleCard from '../people/PeopleCard';

const MovieCast = (props) => {
  const { casts, isLoading } = props;
  return (
    <div className="movie__casts-wrapper">
      <div className="movie__casts-header">
        <h1>Top Billed Casts</h1>
      </div>
      {casts.length === 0 && (
        <p style={{
          opacity: '.7',
          fontStyle: 'italic'
        }}>
        No casts found for this movie.
        </p>
      )}
      {(casts.length >= 1 && !isLoading) && (
        <React.Fragment>
          <div className="movie__casts-grid">
            {casts.map((person, index) => {
              return index < 12 && (
                <PeopleCard 
                    category="people"
                    key={person.id + person.name}
                    people={person}
                />
              );
            })}
          </div>
          <br/>
          <button 
              className="button--primary button--block"
              onClick={() => {
                props.history.push(`/view/movie/${props.match.params.id}/casts`);
                window.scrollTo(null, 0);
              }}
          >
            View All Casts
          </button>
        </React.Fragment>
      )}
    </div>    
  );
};

export default withRouter(MovieCast);
