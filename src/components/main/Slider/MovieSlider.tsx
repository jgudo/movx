import { IMovieData } from '@app/types/types';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import SliderItem from './MovieSliderItem';

interface IProps {
  movies: IMovieData[];
}

const sliderSettings = {
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

const MoviesSlider: React.FC<IProps> = ({ movies }) => {
  console.log('MOVIES -------', movies)
  return (
    <div className="movie__slider">
      {movies.length === 0 ? (
        <SliderItem movie={null} />
      ) : (
        <Slider {...sliderSettings}>
          {movies.map((movie, index) => (
            <SliderItem
              key={movie.id || `movie_slider${index}`}
              movie={movie}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default MoviesSlider;
