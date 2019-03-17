import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import SliderItem from './SliderItem';

const MoviesSlider = ({ movies }) => {
  const [isMobile, setIfMobile] = useState(false);

  useEffect(() => {
    if (window.screen.width <= 480) {
      setIfMobile(true);
    }
  }, []);
  const settings = {
    dots: isMobile,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <div className="movie__slider">
      <Slider {...settings}>
        {movies && movies.map((movie, index) => {
          return index < 10 && (
            <SliderItem 
                key={movie.id} 
                movie={movie}
            />
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
