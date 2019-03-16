import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
const tmdbBackdropPath = 'https://image.tmdb.org/t/p/w1400_and_h450_face/';

const MoviesSlider = (props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <div className="movie__slider">
      <Slider {...settings}>
        {props.movies.map((movie, index) => {
          return index < 10 && (
            <div key={movie.id} className="movie__slider-wrapper">
              <img 
                  alt=""
                  className="movie__slider-backdrop"
                  src={tmdbBackdropPath + movie.backdrop_path} 
              />
              <div className="movie__slider-content">
                <div className="movie__slider-description">
                  <h1>{movie.original_title}</h1>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

MoviesSlider.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

export default MoviesSlider;
