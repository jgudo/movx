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
  const { favorites, isLoading } = useSelector((state: IRootState) => ({
    favorites: state.favorites,
    isLoading: state.misc.isLoading
  }));

  return (
    <div className={gridClass}>
      {!movies && templateCount != 0 ? new Array(templateCount).fill({}).map((item, index) => (
        <MovieCard
          category={category!}
          isLoading={isLoading}
          favorites={[]}
          key={`skeleton_movie_${index}`}
          movie={null}
        />
      )) : movies.map((movie, index) => (
        <MovieCard
          category={movie.media_type || category!}
          isLoading={isLoading}
          key={`${movie.id}_${index}`}
          movie={movie}
          favorites={favorites}
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
