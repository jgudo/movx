import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useDidMount from 'hooks/useDidMount';
import MovieOverview from 'components/movies/MovieOverview';
import MovieCast from 'components/movies/MovieCast';
import MoviePoster from 'components/movies/MoviePoster';
import Reviews from 'components/movies/Reviews';
import SimilarMovies from 'components/movies/SimilarMovies';

// actions
import { fetchSelectedMovie } from 'actions/movieActions';
import { isCurrentlyFetching } from 'actions/miscActions';

// helpers
import { isEmpty } from 'helpers/helperFunctions';

const ViewMovie = (props) => {
  const { favorites, movie, casts, keywords, reviews, isLoading } = useSelector(state => ({
    favorites: state._misc.favorites,
    movie: state._movies.current.movie,
    casts: state._movies.current.casts,
    keywords: state._movies.current.keywords,
    reviews: state._movies.current.reviews,
    isLoading: state._misc.isLoading
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const posters = movie.images ? movie.images.posters : [];

  useEffect(() => {
    const movieId = props.match.params.id;
    fetchMovie(movieId);
  }, []);

  useEffect(() => {
    if (didMount || !movie.id) {
      fetchMovie(props.match.params.id);
    }
  }, [props.match.params.id]);

  const fetchMovie = (id) => {
    const { category } = props.match.params;

    if (parseInt(id, 10) !== movie.id) {
      dispatch(fetchSelectedMovie(category, id));
    }
  };

  const onClickViewImage = () => {
    props.history.push(`/view/movie/${props.match.params.id}/images`);
  };

  return !isLoading ? (
    <>
      <MovieOverview 
          favorites={favorites}
          movie={movie}
      />
      <MovieCast casts={casts} keywords={keywords} movie={movie} />
      {movie.images && (
        <div className="container__wrapper">
          <MoviePoster 
              id={movie.id}
              posters={posters.length > 10 ? posters.slice(0, 10) : posters}
          />
          <button 
              className="button--primary button--block m-auto"
              onClick={onClickViewImage}
          >
            View All Posters
          </button>
        </div>
      )}
      {movie.similar && (
        <SimilarMovies 
            favorites={favorites}
            movies={movie.similar.results} 
        />
      )}
      {(reviews.results && !!reviews.total_pages) && (
        <Reviews reviews={reviews} />
      )}
    </>
    ) : (
    <MovieOverview 
        favorites={[]}
        movie={{}}
    />
  );
};

export default ViewMovie;
