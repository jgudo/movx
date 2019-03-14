import React from 'react';
import { connect } from 'react-redux';
import MovieCard from '../movies/MovieCard';

import { numberWithCommas } from '../../helpers/helperFunctions';

const Favorites = ({ favorites }) => (
  <div className="container">
    <div className="container__wrapper">
      {favorites.length >= 1 ? (
        <React.Fragment>
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
              />
            ))}
          </div>
        </React.Fragment>
      ) : (
        <div className="favorites__blank">
          <h1>You have no favorites</h1>
        </div>
      )}
    </div>
  </div>
);

const mapStateToProps = ({ favorites }) => ({
  favorites
});

export default connect(mapStateToProps)(Favorites);
