import React from 'react';

import MovieCard from './MovieCard';

const SimilarMovies = ({ movies }) => (
  movies.length >= 1 && (
    <div className="similar__wrapper">
      <div className="poster__header">
        <h1>Similar Movies</h1>
      </div>  
      <div className="movie__wrapper">
        {movies.map((movie, index) => (
          <MovieCard 
              category="movie"
              key={`${movie.id}_${index}`}
              movie={movie} 
          />
        ))}
      </div>
    </div>
  )
);

export default SimilarMovies;
