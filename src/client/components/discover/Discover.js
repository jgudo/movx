import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-js-pagination';

import MovieCard from '../card/MovieCard';

const tmdb = 'https://api.themoviedb.org/3';
const tmdbKey = process.env.TMDB_KEY;

class DiscoverMovies extends Component {
  state = {
    movies: {}
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = (page = 1) => {
    axios({
      url: `${tmdb}/discover/movie?api_key=${tmdbKey}&language=en-US&sort_by=popularity.desc&include_video=false&page=${page}`,
      method: 'GET'
    })
      .then((response) => {
        console.log(response.data);
        const trendingMovies = response.data;
        this.setState(() => ({
          movies: {
            discover: {
              activePage: trendingMovies.page,
              collection: trendingMovies.results,
              total_pages: trendingMovies.total_pages,
              total_results: trendingMovies.total_results
            }
          }
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handlePageChange = (e) => {
    this.fetchMovies(e);
  };

  render() {
    const { discover } = this.state.movies;

    return (
      <div className="container">
        <div className="movie__header">
          <h1>Discover</h1>
        </div>    
        <div className="movie__wrapper">
          {discover && discover.collection.map((movie) => {
            return (
              <MovieCard 
                  key={movie.id}
                  movie={movie} 
              />
            )
          })}
        </div>
        <div className="pagination__wrapper">
        {discover && (
          <Pagination
              activePage={discover.activePage || 1}
              firstPageText={<FontAwesomeIcon icon={['fa', 'angle-double-left']} />}
              itemsCountPerPage={10}
              lastPageText={<FontAwesomeIcon icon={['fa', 'angle-double-right']} />}
              nextPageText={<FontAwesomeIcon icon={['fa', 'angle-right']} />}
              onChange={this.handlePageChange}
              pageRangeDisplayed={5}
              prevPageText={<FontAwesomeIcon icon={['fa', 'angle-left']} />}
              totalItemsCount={discover.total_pages || 1000}
          />
        )}
        </div>
      </div>
    );
  }
}

export default DiscoverMovies;
