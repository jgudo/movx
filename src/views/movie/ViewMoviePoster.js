import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Tabs from 'components/tabs/Tabs';
import MoviePoster from 'components/movies/MoviePoster';
import MovieBackdrop from 'components/movies/MovieBackdrop';
import imgBackground from 'images/background.jpg';

import { isEmpty, getYear } from 'helpers/helperFunctions';

const ViewMoviePoster = ({ history }) => {
  const movie = useSelector(state => state._movies.current.movie);
  const posters = movie.images ? movie.images.posters : [];
  const backdrops = movie.images ? movie.images.backdrops : [];
  const tmdbBackdropPath = 'https://image.tmdb.org/t/p/w1400_and_h450_face/'; 

  useEffect(() => {
    if (isEmpty(movie)) {
      history.goBack();
    }
  }, []);

  return !isEmpty(movie) && (
    <>
      <div className="posters__banner">
        <img src={movie.backdrop_path ? `${tmdbBackdropPath}${movie.backdrop_path}` : imgBackground} alt=""/>
        <div className="posters__banner-content">
          <h1>
            {movie.original_title || movie.original__name || movie.name || 'Movie Title Not Found'} 
            &nbsp;
            {(movie.release_date || movie.first_air_date) && (
              <span>{`(${getYear(movie.release_date || movie.first_air_date)})`}</span>
            )}
          </h1>
          <button 
              className="button--back"
              onClick={history.goBack}>
            Back
          </button>
        </div>
      </div>
      <div className="container__wrapper">
        <Tabs>
          <div 
              index={0}
              label={`Posters (${posters.length})`}
          >
            {posters.length >= 1 ? (
              <MoviePoster 
                  id={movie.id}
                  posters={posters} 
              />
            ) : (
              <div className="search__no-result">
                <h1>No posters found.</h1>
              </div>
            )}
          </div>
          <div 
              index={1}
              label={`Backdrops (${backdrops.length})`}
          >
            {backdrops.length >= 1 ? (
              <MovieBackdrop 
                  backdrops={backdrops}
                  id={movie.id}
              />
            ) : (
              <div className="search__no-result">
                <h1>No backdrop image found.</h1>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default ViewMoviePoster;
