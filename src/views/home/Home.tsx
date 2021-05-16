import MovieList from '@app/components/movies/MovieList';
import MoviesSlider from '@app/components/slider/MoviesSlider';
import useDocumentTitle from '@app/hooks/useDocumentTitle';
import { fetchMainMovies } from '@app/redux/actions/movieActions';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';


const App: React.FC<RouteComponentProps> = ({ history }) => {
  const {
    popularMovies,
    topRatedMovies,
    upcomingMovies,
  } = useSelector((state: IRootState) => ({
    popularMovies: state.movies.popular,
    topRatedMovies: state.movies.topRated,
    upcomingMovies: state.movies.upcoming,
    favorites: state.favorites,
  }));
  const dispatch = useDispatch();

  useDocumentTitle();
  useEffect(() => {
    if (!popularMovies || !topRatedMovies || !upcomingMovies) {
      dispatch(fetchMainMovies());
    }
  }, []);

  return (
    <>
      {popularMovies ? (
        <MoviesSlider movies={popularMovies.results || []}
        />
      ) : (
        <MoviesSlider movies={[]}
        />
      )}
      <div className="container__wrapper">
        {upcomingMovies && (
          <>
            <div className="movie__header">
              <div className="movie__header-title header__title">
                <br /><br />
                <h1>Upcoming Movies</h1>
              </div>
            </div>
            <MovieList movies={upcomingMovies.results.slice(0, 10)} />
            <button
              className="button--primary m-auto"
              onClick={() => history.push('/upcoming')}
            >
              View All Upcoming Movies
            </button>
          </>
        )}
        {topRatedMovies && (
          <>
            <div className="movie__header">
              <div className="movie__header-title header__title">
                <br />
                <br />
                <h1>Top Rated Movies</h1>
              </div>
            </div>
            <MovieList movies={topRatedMovies.results.slice(0, 10)} />
            <button
              className="button--primary m-auto"
              onClick={() => history.push('/top_rated')}
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
