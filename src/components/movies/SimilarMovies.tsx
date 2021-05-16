import React from 'react';

import MovieList from './MovieList';

const SimilarMovies = ({ movies, favorites }) => (
  <div className="similar">
    <div className="container__wrapper similar__wrapper">
      <div className="poster__header header__title">
        <h1>Similar Movies</h1>
      </div>
      <MovieList
        category="movie"
        favorites={favorites}
        movies={movies}
      />
    </div>
  </div>
);

export default SimilarMovies;
