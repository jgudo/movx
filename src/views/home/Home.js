import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MoviesSlider from 'components/slider/MoviesSlider';
import MovieCard from 'components/movies/MovieCard';
import { fetchMainMovies } from 'actions/movieActions';
import { isEmpty } from 'helpers/helperFunctions';

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

  return (
    <>
      <MoviesSlider 
          movies={popularMovies.results || []}
          favorites={favorites}
      />
      <div className="container__wrapper">
        <div className="movie__header">
          <div className="movie__header-title header__title">
            <br/><br/>
            <h1>Upcoming Movies</h1>
          </div>
        </div>
        <div className="movie__wrapper">
          {upcomingMovies.results ? upcomingMovies.results.map((movie, index) => {
            return index < 10 && (
              <MovieCard 
                  category="movie"
                  key={`${movie.id}_${index}`}
                  movie={movie} 
                  favorites={favorites}
              />
            );
          }) : new Array(10).fill({}).map((item, index) => (
            <MovieCard 
                category="movie"
                key={`skeleton_upcoming_${index}`}
                movie={{}} 
                favorites={[]}
            />
          ))}
        </div>
        {upcomingMovies.results && (
          <button 
              className="button--primary m-auto"
              onClick={() => props.history.push('/upcoming')}
          >
            View All Upcoming Movies
          </button>
        )}
        <div className="movie__header">
          <div className="movie__header-title header__title">
            <br/>
            <br/>
            <h1>Top Rated Movies</h1>
          </div>
        </div>
        <div className="movie__wrapper">
          {topRatedMovies.results ? topRatedMovies.results.map((movie, index) => {
            return index < 10 && (
                <MovieCard 
                    category="movie"
                    key={`${movie.id}_${index}`}
                    movie={movie} 
                    favorites={favorites}
                />
              
            );
          }) : new Array(10).fill({}).map((item, index) => (
            <MovieCard 
                category="movie"
                key={`skeleton_toprated_${index}`}
                movie={{}} 
                favorites={[]}
            />
          ))}
        </div>
        {topRatedMovies.results && (
          <button 
              className="button--primary m-auto"
              onClick={() => props.history.push('/top_rated')}
          >
            View All Top Rated Movies
          </button>
        )}
      </div>
    </>
  );
};

export default App;
