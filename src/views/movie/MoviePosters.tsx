import imgBackground from '@app/assets/images/background.jpg';
import MovieBackdrop from '@app/components/movies/MovieBackdrop';
import MoviePoster from '@app/components/movies/MoviePoster';
import TabContent from '@app/components/tabs/TabContent';
import Tabs from '@app/components/tabs/Tabs';
import { TMDB_BACKDROP_PATH } from '@app/constants/actionType';
import { getYear } from '@app/helpers/helperFunctions';
import useDocumentTitle from '@app/hooks/useDocumentTitle';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router';

const MoviePosters: React.FC<RouteChildrenProps> = ({ history }) => {
  const movie = useSelector((state: IRootState) => state.movies.current.movie);
  const posters = movie?.images?.posters || [];
  const backdrops = movie?.images?.backdrops || [];

  useDocumentTitle('Movie Posters | MOVX');
  useEffect(() => {
    if (!movie) {
      history.goBack();
    }
  }, []);

  return !movie ? null : (
    <>
      <div className="posters__banner">
        <img src={movie.backdrop_path ? `${TMDB_BACKDROP_PATH}${movie.backdrop_path}` : imgBackground} alt="" />
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
        <Tabs>
          <TabContent index={0} label={`Posters (${posters.length})`}>
            {posters.length >= 1 ? (
              <MoviePoster
                id={movie.id}
                posters={posters}
              />
            ) : (
              <div className="search__no-result">
                <h1>No posters found.</h1>
              </div>
            )}
          </TabContent>
          <TabContent index={1} label={`Backdrops (${backdrops.length})`}>
            {backdrops.length >= 1 ? (
              <MovieBackdrop
                backdrops={backdrops}
                id={movie.id}
              />
            ) : (
              <div className="search__no-result">
                <h1>No backdrop image found.</h1>
              </div>
            )}
          </TabContent>
        </Tabs>
      </div>
    </>
  );
};

export default MoviePosters;
