import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ModalVideo from 'react-modal-video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../layout/ImageLoader';
import { faPrescription, faFilePrescription } from '@fortawesome/free-solid-svg-icons';

const tmdb = 'https://api.themoviedb.org/3/';
const tmdbKey = process.env.TMDB_KEY;
const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';

class ViewPeople extends Component {
  state = {
    person: {},
    loaded: false,
    error: undefined,
    isOpen: false
  };

  componentDidMount() {
    const movieId = this.props.match.params.id;

    axios.get(`${tmdb}person/${movieId}?api_key=${tmdbKey}`)
      .then((response) => {
        const person = response.data;
        this.setState(() => ({ 
          person,
          loaded: true,
          error: undefined 
        }));
      })
      .catch((e) => {
        console.log('Cannot fetch movie', e);
        this.setState(() => ({
          loaded: true,
          error: 'Movie details cannot be loaded'
         }));
      });
  }

  isEmpty = (obj) => {
    for(let key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  
  getReleaseYear = (date) => {
    if (date) {
      return date.split('-')[0];
    }
  };

  goPreviousPage = () => {
    this.props.history.goBack();
  };

  render() {
    const { person, isOpen, loaded, error } = this.state;
    console.log(person);
    return (
      <React.Fragment>
        {!loaded && (
          <div className="loading__wrapper">
            <div className="loading__circular"></div>
          </div>
        )}
        <div className="container">
          <div className="container__wrapper">
            {(loaded && !this.isEmpty(person))  && (
              <div className="movie__view">
                <div className="movie__view-poster">
                  <LazyLoad 
                      debounce={false}
                      height={450}
                      offsetVertical={500}
                      width={300}faFilePrescription
                    >
                      <ImageLoader 
                          alt={person.name}
                          imgId={person.id} 
                          src={`${tmdbPosterPath + person.profile_path}`} 
                      />
                  </LazyLoad>
                </div>
                <div className="movie__view-details">
                  <h1 className="movie__title">
                    {person.name}
                  </h1>
                  {/* <p className="movie__rating">
                    <FontAwesomeIcon icon={['fa', 'star']} color="yellow" />
                    &nbsp;{movie.vote_average} Rating
                  </p> */}
                  <h4>Biography</h4>
                  <p>{person.biography}</p>
                  {/* <button className="button--primary" onClick={this.openVideoModal}>
                    Watch Trailer
                    <FontAwesomeIcon icon={['fa', 'play-circle']} />
                  </button>
                  <button className="button--outlined">
                    Add To Favorites
                    <FontAwesomeIcon icon={['fa', 'heart']} />
                  </button> */}
                </div>            
              </div>
            )}
            {error && (
              <div className="person__not-found">
                <h1>{error}</h1>
                <button 
                    className="button--primary"
                    onClick={this.goPreviousPage}>
                    Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ViewPeople);
