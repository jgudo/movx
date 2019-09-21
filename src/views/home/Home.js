import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MoviesSlider from '../../components/slider/MoviesSlider';
import MovieCard from '../../components/movies/MovieCard';
import Footer from '../../components/common/Footer';
import Loader from '../../components/hoc/Loader';

import { fetchMainMovies } from '../../actions/actions';
import { isEmpty } from '../../helpers/helperFunctions';

const App = (props) => {
  const { 
    popularMovies,
    topRatedMovies,
    upcomingMovies
  } = props;

  useEffect(() => {
    if (isEmpty(popularMovies) || 
        isEmpty(topRatedMovies) || 
        isEmpty(upcomingMovies) || 
        popularMovies.page !== 1 
    ) {
      props.fetchMainMovies();
    }
  }, []);

  const onClickLink = (location) => {
    props.history.push(location);
    window.scrollTo(undefined, 0);
  };

  return (
    <div className="container-full">
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
          {!isEmpty(upcomingMovies) && upcomingMovies.results.map((movie, index) => {
            return index < 10 && (
              <MovieCard 
                  category="movie"
                  key={`${movie.id}_${index}`}
                  movie={movie} 
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
  fetchMainMovies: () => dispatch(fetchMainMovies())
});

const appWithLoader = Loader('popularMovies')(App);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(appWithLoader));
