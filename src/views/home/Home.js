import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MoviesSlider from 'components/slider/MoviesSlider';
import MovieList from 'components/movies/MovieList';
import { fetchMainMovies } from 'actions/movieActions';
import { isEmpty } from 'helpers/helperFunctions';

const App = (props) => {
  const { 
    popularMovies, 
    topRatedMovies, 
    upcomingMovies, 
    favorites,
    lastFetched 
  } = useSelector(state => ({
    popularMovies: state._movies.popularMovies,
    topRatedMovies: state._movies.topRatedMovies,
    upcomingMovies: state._movies.upcomingMovies,
    favorites: state._misc.favorites,
    lastFetched: state._misc.lastFetched
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(popularMovies) || 
        isEmpty(topRatedMovies) || 
        isEmpty(upcomingMovies) 
    ) {
      dispatch(fetchMainMovies());
    }
  }, []);

  return (
    <>
      {popularMovies.results ? (
        <MoviesSlider 
            movies={popularMovies.results || []}
            favorites={favorites}
        />
      ) : (
        <MoviesSlider 
            movies={[{}]}
            favorites={[]}
        />
      )}
      <div className="container__wrapper">
        {upcomingMovies.results && (
          <>
            <div className="movie__header">
              <div className="movie__header-title header__title">
                <br/><br/>
                <h1>Upcoming Movies</h1>
              </div>
            </div>
            <MovieList 
                favorites={favorites}
                movies={upcomingMovies.results.slice(0, 10)} 
            />
            <button 
                className="button--primary m-auto"
                onClick={() => props.history.push('/upcoming')}
            >
              View All Upcoming Movies
            </button>
          </>  
        )}
        {topRatedMovies.results && (
          <>
            <div className="movie__header">
              <div className="movie__header-title header__title">
                <br/>
                <br/>
                <h1>Top Rated Movies</h1>
              </div>
            </div>
            <MovieList 
                favorites={favorites}
                movies={topRatedMovies.results.slice(0, 10)} 
            />
            <button 
                className="button--primary m-auto"
                onClick={() => props.history.push('/top_rated')}
            >
              View All Top Rated Movies
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default App;
