import { IMovieData, IRootState } from '@app/types/types';
import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

interface IProps {
  movies: IMovieData[];
  category?: 'movie' | 'tv';
  gridClass?: string;
  templateCount?: number;
}

// templateCount = number of items shown blank as loading template
const MovieList: React.FC<IProps> = ({ movies, category, gridClass, templateCount }) => {
  const isLoading = useSelector((state: IRootState) => state.misc.isLoading);

  return (
    <div className={gridClass}>
      {movies.length === 0 && templateCount != 0 ? new Array(templateCount).fill({}).map((item, index) => (
        <MovieCard
          category={category!}
          isLoading={isLoading}
          key={`skeleton_movie_${index}`}
          movie={null}
        />
      )) : movies.map((movie, index) => (
        <MovieCard
          category={movie.media_type || category!}
          isLoading={isLoading}
          key={`${movie.id}_${index}`}
          movie={movie}
        />
      ))}
    </div>
  );
};

MovieList.defaultProps = {
  templateCount: 0,
  category: 'movie',
  gridClass: 'grid'
};

export default MovieList;
