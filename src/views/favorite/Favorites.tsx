import { Container } from '@app/components/common';
import { MovieList } from '@app/components/main';
import { numberWithCommas } from '@app/helpers';
import { useDocumentTitle } from '@app/hooks';
import { IRootState } from '@app/types/types';
import React from 'react';
import { useSelector } from 'react-redux';

const Favorites = () => {
  useDocumentTitle('My Favorites | MOVX');
  const favorites = useSelector((state: IRootState) => state.favorites);

  return (
    <>
      {favorites.length >= 1 ? (
        <Container>
          <div className="movie__header">
            <div className="movie__header-title">
              <h1>My Favorite Movies</h1>
              <h3>{numberWithCommas(favorites.length)} Movies</h3>
            </div>
          </div>
          <MovieList
            category="movie"
            movies={favorites}
          />
        </Container>
      ) : (
        <div className="error">
          <h1>You Don't Have Favorites</h1>
          <p>Click the heart icon on the movie card to add it to favorites</p>
        </div>
      )}
    </>
  );
};

export default Favorites;
