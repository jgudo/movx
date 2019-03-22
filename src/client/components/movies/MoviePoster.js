import React from 'react';
import { withRouter } from 'react-router-dom';

import PosterCard from '../poster/PosterCard';

const MoviePoster = (props) => {
  const { posters, id } = props;
  
  return (
    <React.Fragment>
      <div className="poster__header">
        <h1>Movie Posters</h1>
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
  );
};

export default withRouter(MoviePoster);
