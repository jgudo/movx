import MovieCast from '@app/components/movies/MovieCast';
import MovieOverview from '@app/components/movies/MovieOverview';
import MoviePoster from '@app/components/movies/MoviePoster';
import Reviews from '@app/components/movies/Reviews';
import SimilarMovies from '@app/components/movies/SimilarMovies';
import useDidMount from '@app/hooks/useDidMount';
import useDocumentTitle from '@app/hooks/useDocumentTitle';
import { fetchSelectedMovie } from '@app/redux/actions/movieActions';
import { IRootState, TMediaType } from '@app/types/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

type RouteParams = RouteComponentProps<{ id: string; category: TMediaType }>;

const ViewMovie: React.FC<RouteParams> = ({ history, match }) => {
  const { favorites, movie, reviews, isLoading } = useSelector((state: IRootState) => ({
    favorites: state.favorites,
    movie: state.movies.current.movie,
    reviews: state.movies.current.reviews,
    isLoading: state.misc.isLoading
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const posters = movie?.images?.posters || [];

  useDocumentTitle(movie?.id ? `${movie.original_name || movie.original_title} | MOVX` : 'View Movie | MOVX');
  useEffect(() => {
    const movieId = match.params.id;
    fetchMovie(movieId);
  }, []);

  useEffect(() => {
    if (didMount || !movie) {
      fetchMovie(match.params.id);
    }
  }, [match.params.id]);

  const fetchMovie = (id: string) => {
    if (parseInt(id, 10) !== movie?.id) {
      dispatch(fetchSelectedMovie(match.params.category, id));
    }
  };

  const onClickViewImage = () => {
    history.push(`/view/movie/${match.params.id}/images`);
  };

  return !isLoading ? (
    <>
      <MovieOverview />
      <MovieCast />
      {movie?.images && (
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
      {movie?.similar && (
        <>
          {movie.similar.results.length !== 0 && (
            <SimilarMovies
              favorites={favorites}
              movies={movie.similar.results}
            />
          )}
        </>
      )}
      {(reviews && !!reviews.total_pages) && (
        <Reviews />
      )}
    </>
  ) : (
    <MovieOverview />
  );
};

export default ViewMovie;
