import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import MoviesSlider from './components/slider/MoviesSlider';
import MovieCard from './components/movies/MovieCard';
import Footer from './components/layout/Footer';

import { fetchMoviesBy, isCurrentlyFetching } from './actions/actions';
import { isEmpty } from './helpers/helperFunctions';

const App = (props) => {
  const { 
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    isLoading 
  } = props;

  useEffect(() => {
    if (isEmpty(popularMovies)) props.fetchMoviesBy('FETCH_POPULAR_MOVIES', 'movie/popular?');
    if (isEmpty(topRatedMovies)) props.fetchMoviesBy('FETCH_TOPRATED_MOVIES', 'movie/top_rated?');
    if (isEmpty(upcomingMovies)) props.fetchMoviesBy('FETCH_UPCOMING_MOVIES', 'movie/upcoming?');
  }, []);

  return (
    <div className="container container__root">
      <MoviesSlider 
        movies={popularMovies.results}
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
          {upcomingMovies.results.map((movie, index) => {
            return index < 10 && (
              <MovieCard 
                  category="movie"
                  key={`${movie.id}_${index}`}
                  movie={movie} 
              />
            );
          })}
        </div>
        <div className="movie__header">
          <div className="movie__header-title">
            <br/>
            <br/>
            <h1>Top Rated Movies</h1>
          </div>
        </div>
        <div className="movie__wrapper">
          {topRatedMovies.results.map((movie, index) => {
            return index < 10 && (
              <MovieCard 
                  category="movie"
                  key={`${movie.id}_${index}`}
                  movie={movie} 
              />
            );
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = ({ 
  popularMovies, 
  topRatedMovies,
  upcomingMovies,
  isLoading
}) => ({
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchMoviesBy: (action, query, page) => dispatch(fetchMoviesBy(action, query, page)),
  isCurrentlyFetching: () => dispatch(isCurrentlyFetching())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
