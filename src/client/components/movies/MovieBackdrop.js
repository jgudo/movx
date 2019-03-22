import React from 'react';

import BackdropCard from '../poster/BackdropCard';

const MovieBackdrop = ({ backdrops, id }) => {
  return (
    <div className="backdrop">
      {backdrops.length >= 1 ? (
        <div className="backdrop__wrapper">
        <div className="poster__header">
          <h1>Movie Backdrops</h1>
        </div>  
        <div className="backdrop__grid">
          {backdrops.map((backdrop, index) => {
            return (
              <BackdropCard 
                  key={`${id}_poster${index}`}
                  backdrop={backdrop}
              />
            );
          })}
        </div>
      </div>
      ) : (
        <div className="search__no-result">
          <h1>No backdrop image found.</h1>
        </div>
      )}
    </div>
  );
};

export default MovieBackdrop;
