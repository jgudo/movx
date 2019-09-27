import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingScreen from 'components/common/LoadingScreen'; 
import GenreCard from 'components/genres/GenreCard'; 

import { isEmpty } from 'helpers/helperFunctions';
import { fetchGenres } from 'actions/genreActions';

const Genres = (props) => {
  const { genres, isLoading } = useSelector(state => ({
    genres: state._genre.genres,
    isLoading: state._misc.isLoading
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(genres)) {
      dispatch(fetchGenres('/genre/movie/list?'));
    }
  }, []);

  return (
    <div className="container">
      {isLoading && <LoadingScreen />}
      {genres.length >= 1 && (
        <>
          <h1>Genres</h1>
          <div className="genre__wrapper">
            {genres.map((genre) => {
              return (
                <GenreCard 
                    category="genre"
                    genre={genre} 
                    key={genre.id}
                />
              );
            })}
          </div>
        </>  
      )}
    </div>
  );
};

export default Genres;
