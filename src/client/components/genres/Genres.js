import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import GenreCard from './GenreCard'; 

import { isEmpty } from '../../helpers/helperFunctions';

// actions
import { fetchGenres } from '../../actions/actions';

const Genres = (props) => {
  const { genres, isLoading } = props;

  useEffect(() => {
    if (isEmpty(genres)) {
      props.fetchGenres('genre/movie/list?');
    }
  }, []);

  return (
    <div className="container">
      {isLoading && <LoadingScreen />}
      {genres.length >= 1 && (
        <div className="container__wrapper container__movies">
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
        </div>  
      )}
    </div>
  );
};

Genres.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = ({ genres, isLoading }) => ({
  genres,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchGenres: (url, page) => dispatch(fetchGenres(url, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
