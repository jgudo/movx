import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

import ImageLoader from '../layout/ImageLoader';
import LoadingScreen from '../layout/LoadingScreen';

// helpers
import { isEmpty } from '../../helpers/helperFunctions';


const tmdb = 'https://api.themoviedb.org/3/';
const tmdbKey = process.env.TMDB_KEY;
const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';

class ViewPeople extends Component {
  state = {
    person: {},
    loaded: false,
    error: undefined
  };

  componentDidMount() {
    const personId = this.props.match.params.id;

    axios.get(`${tmdb}person/${personId}?api_key=${tmdbKey}`)
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
          error: 'Person\'s details cannot be loaded'
        }));
      });
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
    const { person, loaded, error } = this.state;

    return (
      <React.Fragment>
        {!loaded && <LoadingScreen />}
        <div className="container container__backdrop">
          <div className="container__wrapper container__backdrop-wrapper">
            {(loaded && !isEmpty(person))  && (
              <React.Fragment>
                <div className="back__button">
                  <button 
                      className="button--back"
                      onClick={this.goPreviousPage}>
                    Back
                  </button>
                </div>
                <div className="view">
                  <div className="view__poster">
                    <LazyLoad 
                        debounce={false}
                        height={450}
                        offsetVertical={500}
                        width={300}
                      >
                        <ImageLoader 
                            alt={person.name}
                            imgId={person.id} 
                            src={`${tmdbPosterPath + person.profile_path}`} 
                        />
                    </LazyLoad>
                  </div>
                  <div className="view__details">
                    <h1 className="view__title">
                      {person.name}
                    </h1>
                    {/* <p className="movie__rating">
                      <FontAwesomeIcon icon={['fa', 'star']} color="yellow" />
                      &nbsp;{movie.vote_average} Rating
                    </p> */}
                    <h4>Biography</h4>
                    <p>{person.biography}</p>
                    <button className="button--primary">
                      Read Full Biography
                    </button>
                  </div> 
                </div>           
              </React.Fragment>
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
