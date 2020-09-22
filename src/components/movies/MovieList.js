import React from 'react';
import MovieCard from './MovieCard';

// templateCount = number of items shown blank as loading template
const MovieList = ({ movies, favorites, category, gridClass, templateCount, isLoading }) => {
	return (
		<div className={gridClass}>
			{!movies && templateCount != 0 ? new Array(templateCount).fill({}).map((item, index) => (
				<MovieCard
					category={category}
					key={`skeleton_movie_${index}`}
					movie={{}}
					favorites={[]}
				/>
			)) : movies.map((movie, index) => (
				<MovieCard
					category={movie.media_type || category}
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
