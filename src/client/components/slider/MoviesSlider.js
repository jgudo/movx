import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import SliderItem from './SliderItem';

const MoviesSlider = ({ movies }) => {
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
