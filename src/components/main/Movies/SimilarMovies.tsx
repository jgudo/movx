import { IMovieData } from '@app/types/types';
import React from 'react';
import MovieList from './MovieList';

interface IProps {
  movies: IMovieData[];
}

const SimilarMovies: React.FC<IProps> = ({ movies }) => {
  return movies.length === 0 ? null : (
    <div className="similar">
      <div className="container__wrapper similar__wrapper">
        <div className="poster__header header__title">
          <h1>Similar Movies</h1>
        </div>
        <MovieList
          category="movie"
          movies={movies}
        />
      </div>
    </div>
  );
}

export default SimilarMovies;
