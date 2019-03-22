import React from 'react';

import PosterCard from '../poster/PosterCard';

const MoviePoster = ({ movie }) => {
  return (
    <div className="poster">
      <div className="poster__wrapper">
        <div className="poster__header">
          <h1>Movie Posters</h1>
        </div>  
        <div className="movie__wrapper">
          {movie.images.posters.map((poster, index) => {
            return index < 10 && (
              <PosterCard 
                  key={`${movie.id}_poster${index}`}
                  poster={poster}
              />
            );
          })}
        </div>
        <button className="button--primary m-auto">
          View All Posters
        </button>
      </div>
    </div>
  );
};

export default MoviePoster;
