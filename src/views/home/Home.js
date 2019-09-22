import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MoviesSlider from '../../components/slider/MoviesSlider';
import MovieCard from '../../components/movies/MovieCard';
import Footer from '../../components/common/Footer';
import Loader from '../../components/hoc/Loader';

import { fetchMainMovies } from '../../actions/movieActions';
import { isEmpty } from '../../helpers/helperFunctions';

const App = (props) => {
  const { popularMovies, topRatedMovies, upcomingMovies, favorites } = useSelector(state => ({
    popularMovies: state._movies.popularMovies,
    topRatedMovies: state._movies.topRatedMovies,
    upcomingMovies: state._movies.upcomingMovies,
    favorites: state._misc.favorites
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (isEmpty(popularMovies) || 
        isEmpty(topRatedMovies) || 
        isEmpty(upcomingMovies) || 
        popularMovies.page !== 1 
    ) {
      dispatch(fetchMainMovies());
    }
  }, []);

  const onClickLink = (location) => {
    props.history.push(location);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container-full">
      <MoviesSlider 
          movies={popularMovies.results || []}
          favorites={favorites}
      />
      <div className="container__wrapper">
        <div className="movie__header">
          <div className="movie__header-title">
            <br/>
            <br/>
            <h1>Upcoming Movies</h1>
          </div>
        </div>
        <div className="movie__wrapper">
          {!isEmpty(upcomingMovies) && upcomingMovies.results.map((movie, index) => {
            return index < 10 && (
              <MovieCard 
                  category="movie"
                  key={`${movie.id}_${index}`}
                  movie={movie} 
                  favorites={favorites}
              />
            );
          })}
        </div>
        <button 
            className="button--primary m-auto"
            onClick={() => onClickLink('/upcoming')}
        >
        View All Upcoming Movies
        </button>
        <div className="movie__header">
          <div className="movie__header-title">
            <br/>
            <br/>
            <h1>Top Rated Movies</h1>
          </div>
        </div>
        <div className="movie__wrapper">
          {!isEmpty(topRatedMovies) && topRatedMovies.results.map((movie, index) => {
            return index < 10 && (
              <MovieCard 
                  category="movie"
                  key={`${movie.id}_${index}`}
                  movie={movie} 
                  favorites={favorites}
              />
            );
          })}
        </div>
        <button 
            className="button--primary m-auto"
            onClick={() => onClickLink('/top_rated')}
        >
        View All Top Rated Movies
        </button>
        <Footer />
      </div>
    </div>
  );
};

export default Loader('popularMovies')(App);
