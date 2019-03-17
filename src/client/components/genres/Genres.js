import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import GenreCard from './GenreCard'; 

import { isEmpty } from '../../helpers/helperFunctions';
// actions
import { fetchRequest } from '../../actions/actions';

const Genres = (props) => {
  const { genres } = props.genres;

  useEffect(() => {
    if (isEmpty(props.genres)) {
      props.fetchRequest('FETCH_GENRES', 'genre/movie/list?');
    }
  }, []);

  return (
    <div className="container">
      {isEmpty(props.genres) && <LoadingScreen />}
      {!isEmpty(props.genres) && (
        <div className="container__wrapper container__movies">
            {genres.length >= 1 && (
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
          </div>  
      )}
    </div>
  );
};

Genres.propTypes = {
  genres: PropTypes.shape({
    genres: PropTypes.array
  })
};

const mapStateToProps = ({ genres }) => ({
  genres
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
