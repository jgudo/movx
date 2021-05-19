import React from 'react';

import PosterCard from '@app/components/main/Poster/PosterCard';

const MoviePoster = ({ posters, id }) => (
  <div className="poster">
    <div className="poster__wrapper">
      <div className="poster__header header__title">
        <h1>Movie Posters</h1>
      </div>
      <div className="grid">
        {posters.map((poster, index) => {
          return (
            <PosterCard
                key={`${id}_poster${index}`}
                poster={poster}
            />
          );
        })}
      </div>
    </div>
  </div>
);

export default MoviePoster;
