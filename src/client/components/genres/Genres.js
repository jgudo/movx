import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import GenreCard from './GenreCard'; 
import Error from '../layout/Error';

import { isEmpty } from '../../helpers/helperFunctions';
// actions
import { fetchRequest } from '../../actions/actions';

const Genres = (props) => {
  const [error, setIfError] = useState(undefined);
  const { genres, isLoading } = props;

  useEffect(() => {
    if (isEmpty(props.genres)) {
      props.fetchRequest('FETCH_GENRES', 'genre/movie/list?')
        .then((status) => {
          if (status === 503) {
            setIfError('Error connection');
          } else if (status === 404) {
            setIfError('Cannot fetch movies');
          }
        });
    }
  }, []);

  return (
    <div className="container">
      {isLoading && <LoadingScreen />}
      <div className="container__wrapper container__movies">
        {(genres.length >= 1 && !error) && (
          <React.Fragment>
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
          </React.Fragment>
        )}
        {error && (
          <Error error={error} />
        )}
      </div>  
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
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
