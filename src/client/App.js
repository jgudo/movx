import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import MoviesSlider from './components/slider/MoviesSlider';

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
    <div>
      <MoviesSlider 
        movies={popularMovies.results}
      />
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
