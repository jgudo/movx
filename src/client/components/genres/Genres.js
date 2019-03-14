import React, { useEffect } from 'react';
import { connect } from 'react-redux';
 
import LoadingScreen from '../layout/LoadingScreen'; 
import GenreCard from './GenreCard'; 

// actions
import { fetchRequest } from '../../actions/actions';

const Genres = (props) => {
  const { genres } = props;

  useEffect(() => {
    if (props.genres.length === 0) {
      props.fetchRequest('FETCH_GENRES', 'genre/movie/list?');
    }
  }, []);

  return (
    <React.Fragment>
      {genres.length === 0 && <LoadingScreen />}
      <div className="container">
        <div className="container__wrapper">
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
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ genres }) => ({
  genres
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
