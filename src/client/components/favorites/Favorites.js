import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MovieCard from '../movies/MovieCard';

import { numberWithCommas } from '../../helpers/helperFunctions';

const Favorites = ({ favorites }) => (
  <React.Fragment>
    {favorites.length >= 1 ? (
      <div className="container">
        <div className="container__wrapper container__movies">
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
        </div>
      </div>
    ) : (
      <div className="error">
        <h1>You Don't Have Favorites</h1>
        <p>Click the heart icon on the movie card to add it to favorites</p>
      </div>
    )}
  </React.Fragment>
);

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number
  }))
};

const mapStateToProps = ({ favorites }) => ({
  favorites
});

export default connect(mapStateToProps)(Favorites);
