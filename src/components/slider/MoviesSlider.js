import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import SliderItem from './SliderItem';

const MoviesSlider = ({ movies, favorites }) => {
  const [isMobile, setIfMobile] = useState(false);

  useEffect(() => {
    if (window.screen.width <= 480) {
      setIfMobile(true);
    }
  }, []);
  const settings = {
    dots: isMobile,
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
      {movies.length !== 0 && (
        <Slider {...settings}>
          {movies.map((movie, index) => index < 10 && (
            <SliderItem 
                key={movie.id} 
                movie={movie}
                favorites={favorites}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

MoviesSlider.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

export default MoviesSlider;
