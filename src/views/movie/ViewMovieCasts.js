import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../../components/common/ImageLoader';
import imgPlaceholder from '../../images/placeholder.jpg';

import { numberWithCommas } from '../../helpers/helperFunctions';

const ViewMoviePoster = ({ history }) => {
  const { movie, casts } = useSelector(state => ({
    movie: state._movies.current.movie,
    casts: state._movies.current.casts
  }));
  const tmdbBackdropPath = 'https://image.tmdb.org/t/p/w1400_and_h450_face/';
  const tmdbPosterPath = 'https://image.tmdb.org/t/p/w185_and_h278_face/';
  
  const getReleaseYear = (date) => {
    if (date) {
      return date.split('-')[0];
    }
  };

  return (
    <div className="container-full">
      <div className="posters__banner">
        <img src={`${tmdbBackdropPath + movie.backdrop_path}`} alt=""/>
        <div className="posters__banner-content">
          <h1>
            {movie.original_title || movie.original__name || movie.name || 'Movie Title Not Found'} 
            &nbsp;
            {(movie.release_date || movie.first_air_date) && (
              <span>{`(${getReleaseYear(movie.release_date || movie.first_air_date)})`}</span>
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
        <div className="movie__header">
          <div className="movie__header-title">
            <h1>All Casts</h1>
            <h3>{numberWithCommas(casts.length)} People</h3>
          </div>
        </div>  
        {casts.length >= 1 && (
          <div className="casts__wrapper">
            {casts.map(cast => (
              <Link 
                  key={`cast_${cast.id}`}
                  to={`/view/person/profile/${cast.id}`}
              >
                <div className="casts__item">
                  <div className="casts__avatar">
                    <LazyLoad 
                        debounce={false}
                        offsetVertical={500}
                    >
                      <ImageLoader 
                          alt={cast.name}
                          imgId={cast.id} 
                          src={cast.profile_path ? `${tmdbPosterPath + cast.profile_path}` : imgPlaceholder} 
                      />
                    </LazyLoad>
                  </div>
                  <div className="casts__details">
                    <h4>{cast.name || 'Not Available'}</h4>
                    {cast.character && (
                      <p className="card__character">{`(${cast.character})`}</p> 
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMoviePoster;
