import React, { Component } from 'react';
import axios from 'axios';

const tmdb = 'https://api.themoviedb.org/3/';
const tmdbKey = process.env.TMDB_KEY;

class ViewMovie extends Component {
  state = {
    movie: {}
  };

  componentDidMount() {
    const movieId = this.props.match.params.id;
    const movieCategory = this.props.match.params.category;

    axios.get(`${tmdb + movieCategory}/${movieId}?api_key=${tmdbKey}`)
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

    if (movie) {
      return (
        <div className="container">
          <h1>{movie.original_title || movie.original_name}</h1>
        </div>
      );
    }
  }
}

export default ViewMovie;
