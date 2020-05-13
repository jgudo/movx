import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css'; 

import SliderItem from './SliderItem';

const MoviesSlider = ({ movies, favorites }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    draggable: true,
    easing: 'easeInOutQuad',
    fade: true
  };

  return (
    <div className="movie__slider">
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <SliderItem 
              key={movie.id || `movie_slider${index}`} 
              movie={movie}
              favorites={favorites}
          />
        ))}
      </Slider>
    </div>
  );
};

MoviesSlider.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

export default MoviesSlider;
