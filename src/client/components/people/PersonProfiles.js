import React from 'react';

import PosterCard from '../poster/PosterCard';

const PersonProfiles = (props) => {
  const { posters, id } = props;
  
  return (
    posters.length >= 1 ? (
      <React.Fragment>
        <div className="poster__header">
          <h1>Profile Images</h1>
        </div>  
        <div className="movie__wrapper">
          {posters.map((poster, index) => {
            return (
              <PosterCard 
                  key={`${id}_poster${index}`}
                  poster={poster}
              />
            );
          })}
        </div>
      </React.Fragment>
    ) : (
      <div className="search__no-result">
        <h1>No posters found.</h1>
      </div>
    )
  );
};

export default PersonProfiles;
