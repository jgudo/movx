import React from 'react';

import BackdropCard from '../poster/BackdropCard';

const MovieBackdrop = ({ backdrops, id }) => (
  <div className="backdrop">
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
  </div>
);

export default MovieBackdrop;
