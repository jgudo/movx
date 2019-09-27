import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { numberWithCommas, toHrsMins } from 'helpers/helperFunctions';

const MovieDetails = ({ movie, keywords }) => (
  <div className="movie__details">
    {movie.genres && (
      <div className="movie__details-genre">
        <h4>Genres</h4>
        {movie.genres.map((genre) => {
          const genreName = genre.name.toLowerCase().replace(' ', '-');
          return (
            <Link 
                className="button--key"
                key={genre.id + genre.name}
                to={`/genre/${genreName}/${genre.id}`} 
            >
              {genre.name}
            </Link>
          );
        })}
      </div>
    )}
    {movie.homepage && (
      <div className="movie__details-homepage">
        <h4>Homepage</h4>
        <p>
          <a href={movie.homepage}>🌏 &nbsp; Visit</a>
        </p>
      </div>
    )}
    {movie.release_date && (
      <div className="movie__details-release">
        <h4>Release Date</h4>
        <p>{movie.release_date}</p>
      </div>
    )}
    {movie.status && (
      <div className="movie__details-status">
        <h4>Status</h4>
        <p>{movie.status}</p>
      </div>
    )}
    {movie.vote_average && (
      <div className="movie__details-rating">
        <h4>Rating</h4>
        <p>
          <span className="icon icon-star">★</span>
          {movie.vote_average}
        </p>
      </div>
    )}
    {movie.budget > 0 && (
      <div className="movie__details-budget">
        <h4>Budget</h4>
        <p>${numberWithCommas(movie.budget)}</p>
      </div>
    )}
    {movie.revenue > 0 && (
      <div className="movie__details-revenue">
        <h4>Revenue</h4>
        <p>${numberWithCommas(movie.revenue)}</p>
      </div>
    )}
    {movie.runtime && (
      <div className="movie__details-runtime">
        <h4>Runtime</h4>
        <p>{toHrsMins(movie.runtime)}</p>
      </div>
    )}
    {keywords && keywords.length >= 1 && (
      <div className="movie__details-keywords">
        <h4>Keywords</h4>
        {keywords.map(keyword => (
          <Link 
              className="button--key"
              key={keyword.id + keyword.name}
              to={`/search/movie/${keyword.name}`} 
          >
            #{keyword.name}
          </Link>
        ))}
      </div>
    )}
  </div>
);

export default withRouter(MovieDetails);
