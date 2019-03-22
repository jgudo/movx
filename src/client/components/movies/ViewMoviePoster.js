import React from 'react';
import { connect } from 'react-redux';

import Tabs from '../tabs/Tabs';
import MoviePoster from './MoviePoster';
import MovieBackdrop from './MovieBackdrop';

const tmdbBackdropPath = 'https://image.tmdb.org/t/p/w1400_and_h450_face/';

const ViewMoviePoster = (props) => {
  const { 
    movie, 
    movie: {
      images: {
        posters,
        backdrops
      }
    } 
  } = props;
  
  const goPreviousPage = () => {
    props.history.goBack();
  };

  const getReleaseYear = (date) => {
    if (date) {
      return date.split('-')[0];
    }
  };

  return (
    <div className="container pt-0 mt-0">
      <div className="posters__banner">
        <img src={`${tmdbBackdropPath + movie.backdrop_path}`} alt=""/>
        <div className="posters__banner-content">
          <h1>
            {movie.original_title || 
             movie.original__name || 
             movie.name} &nbsp;
             {(movie.release_date || movie.first_air_date) && (
              <span>{`(${getReleaseYear(movie.release_date || movie.first_air_date)})`}</span>
             )}
          </h1>
          <button 
              className="button--back"
              onClick={goPreviousPage}>
            Back
          </button>
        </div>
      </div>
      <div className="container__wrapper">
        <Tabs>
          <div label={`Posters (${posters.length})`}>
            <MoviePoster 
                id={movie.id}
                posters={posters} 
            />
          </div>
          <div label={`Backdrops (${backdrops.length})`}>
            <MovieBackdrop 
                backdrops={backdrops}
                id={movie.id}
            />
          </div>
        </Tabs>
      </div>
    </div>
  );
};

const mapStateToProps = ({ current }) => ({
  movie: current.movie
});

export default connect(mapStateToProps)(ViewMoviePoster);
