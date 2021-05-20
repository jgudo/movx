import { ImageLoader } from '@app/components/common';
import { TMDB_BACKDROP_PATH, TMDB_POSTER_PATH } from '@app/constants/actionType';
import { getYear, numberWithCommas } from '@app/helpers';
import { useDocumentTitle } from '@app/hooks';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
// @ts-ignore
import LazyLoad from 'react-lazy-load';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

const MovieCasts: React.FC<RouteComponentProps> = ({ history }) => {
  const { movie, casts } = useSelector((state: IRootState) => ({
    movie: state.movies.current.movie,
    casts: state.movies.current.casts
  }));

  useDocumentTitle('Movie Casts | MOVX');
  useEffect(() => {
    !movie && history.goBack();
  }, []);

  return !movie ? null : (
    <>
      <div className="posters__banner">
        <img src={`${TMDB_BACKDROP_PATH + movie.backdrop_path}`} alt="" />
        <div className="posters__banner-content">
          <h1>
            {movie.original_title || movie.original_name || movie.name || 'Movie Title Not Found'}
            &nbsp;
            {(movie.release_date || movie.first_air_date) && (
              <span>{`(${getYear(movie.release_date || movie.first_air_date)})`}</span>
            )}
          </h1>
          <button
            className="button--back"
            onClick={history.goBack}>
            Back
          </button>
        </div>
      </div>
      <div className="container__wrapper">
        <div className="movie__header">
          <div className="movie__header-title">
            <h1>All Casts</h1>
            <h3>{numberWithCommas(casts.length)} People</h3>
          </div>
        </div>
        {casts.length >= 1 && (
          <div className="casts__wrapper">
            {casts.map(cast => (
              <Link
                key={`cast_${cast.id}`}
                to={`/view/person/profile/${cast.id}`}
              >
                <div className="casts__item">
                  <div className="casts__avatar">
                    <LazyLoad
                      debounce={false}
                      offsetVertical={500}
                    >
                      <ImageLoader
                        alt={cast.name}
                        imgId={cast.id}
                        src={cast.profile_path ? `${TMDB_POSTER_PATH + cast.profile_path}` : '/placeholder.jpg'}
                      />
                    </LazyLoad>
                  </div>
                  <div className="casts__details">
                    <h4>{cast.name || 'Not Available'}</h4>
                    {cast.character && (
                      <p className="card__character">{`${cast.character}`}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MovieCasts;
