import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../layout/ImageLoader';

const tmdb = 'https://api.themoviedb.org/3/';
const tmdbKey = process.env.TMDB_KEY;
const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';

class ViewMovie extends Component {
  state = {
    movie: {}
  };

  componentDidMount() {
    const movieId = this.props.match.params.id;
    const movieCategory = this.props.match.params.category;

    axios.get(`${tmdb + movieCategory}/${movieId}?api_key=${tmdbKey}&append_to_response=videos`)
      .then((response) => {
        const movie = response.data;
        this.setState(() => ({ movie }));
      })
      .catch((e) => {
        console.log('Cannot fetch movie', e);
      });
  }

  render() {
    const { movie } = this.state;
    return (
      <div className="container">
        <div className="container__wrapper">
          {movie ? (
            <div className="movie__view">
              <div className="movie__view-poster">
                <LazyLoad 
                    debounce={false}
                    height={450}
                    offsetVertical={500}
                    width={300}
                  >
                    <ImageLoader 
                        alt={movie.original_title || movie.original_name || movie.title}
                        imgId={movie.id} 
                        src={`${tmdbPosterPath + movie.poster_path}`} 
                    />
                </LazyLoad>
              </div>
              <div className="movie__view-details">
                <h1>{movie.original_title || movie.original_name}</h1>
                <h4>Overview</h4>
                <p>{movie.overview}</p>
                <button className="button--primary">
                  Watch Trailer
                  <FontAwesomeIcon icon={['fa', 'play-circle']} />
                </button>
                <button className="button--outlined">
                  Add To Favorites
                  <FontAwesomeIcon icon={['fa', 'heart']} />
                </button>
              </div>            
            </div>
          ) : (
            <div>
              <h1>Movie details cannot be viewed</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ViewMovie;
