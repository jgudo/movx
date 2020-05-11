import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'components/common/Container';
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
    <Container>
      {isLoading && <LoadingScreen msg="Loading Genres" />}
      {genres.length >= 1 && (
        <>
          <div className="header__title text-center">
            <br/><br/>
            <h1>Genres</h1>
          </div>
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
    </Container>
  );
};

export default Genres;
