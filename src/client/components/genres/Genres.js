import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import LoadingScreen from '../layout/LoadingScreen'; 
import GenreCard from './GenreCard'; 

// actions
import { fetchRequest } from '../../actions/actions';

class Genres extends Component {
  componentDidMount() {
    if (this.props.genres.length === 0) {
      this.props.fetchRequest('FETCH_GENRES', 'genre/movie/list?');
    }
  }

  render() {
    const { genres } = this.props;
    console.log(genres);
    return (
      <React.Fragment>
        {genres.length === 0 && <LoadingScreen />}
        <div className="container">
          <div className="container__wrapper">
            <h1>Genres</h1>
            <div className="genre__wrapper">
              {genres.length >= 1 && genres.map((genre) => {
                return (
                  <GenreCard 
                      category="genre"
                      genre={genre} 
                      key={genre.id}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ genres }) => ({
  genres
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
