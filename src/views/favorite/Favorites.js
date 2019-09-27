import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from 'components/movies/MovieCard';

import { numberWithCommas } from 'helpers/helperFunctions';

const Favorites = (props) => {
  const favorites = useSelector(state => state._misc.favorites);

  return (
    <>
      {favorites.length >= 1 ? (
        <div className="container">
          <div className="movie__header">
            <div className="movie__header-title">
              <h1>My Favorite Movies</h1>
              <h3>{numberWithCommas(favorites.length)} Movies</h3>
            </div>
          </div>
          <div className="movie__wrapper">
            {favorites.map((favorite, index) => (
              <MovieCard 
                  category="movie"
                  key={`${favorite.id}_${index}`}
                  movie={favorite} 
                  favorites={favorites}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="error">
          <h1>You Don't Have Favorites</h1>
          <p>Click the heart icon on the movie card to add it to favorites</p>
        </div>
      )}
    </>
  );
};

export default Favorites;
