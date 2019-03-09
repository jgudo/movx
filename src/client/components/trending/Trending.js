import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-js-pagination';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import MovieCard from '../card/MovieCard';

const tmdb = 'https://api.themoviedb.org/3';
const tmdbKey = '4377cb2eef06cc002bf39f55a2fb6421';

class TrendingMovies extends Component {
  state = {
    movies: {},
    isLoading: true
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = (page = 1) => {
    axios({
      url: `${tmdb}/trending/all/day?api_key=${tmdbKey}&page=${page}`,
      method: 'GET',
      onUploadProgress: (e) => {
        console.log(e)
      }
    })
      .then((response) => {
        console.log(response.data);
        const trendingMovies = response.data;
        this.setState(() => ({
          movies: {
            trending: {
              activePage: trendingMovies.page,
              collection: trendingMovies.results,
              total_pages: trendingMovies.total_pages,
              total_results: trendingMovies.total_results
            }
          },
          isLoading: false
        }));
      })
      .catch((err) => {
        console.error(err);
        this.setState(() => ({ isLoading: false }));
      });
  }

  handlePageChange = (e) => {
    if (this.state.movies.trending.activePage !== e) {
      this.setState(() => ({ isLoading: true }));
      this.fetchMovies(e);
    }
  };

  render() {
    const { trending } = this.state.movies;

    return (
      <React.Fragment>
        <TopProgressLoader isLoading={this.state.isLoading} />
        <div 
            className="container" 
            /* eslint no-return-assign: 0 */
            ref={el => this.container = el}
        >
            
          <div className="movie__header">
            <h1>Trending Movies</h1>
          </div>
          <div className="movie__wrapper">
            {trending && trending.collection.map((movie) => {
              return (
                <MovieCard 
                    key={movie.id}
                    movie={movie} 
                />
              )
            })}
          </div>
          {trending && (
            <div className="pagination__wrapper">
              <p>Page {trending.activePage}/{trending.total_pages}</p>
              <Pagination
                  activePage={trending.activePage || 1}
                  firstPageText={<FontAwesomeIcon icon={['fa', 'angle-double-left']} />}
                  itemsCountPerPage={10}
                  lastPageText={<FontAwesomeIcon icon={['fa', 'angle-double-right']} />}
                  nextPageText={<FontAwesomeIcon icon={['fa', 'angle-right']} />}
                  onChange={this.handlePageChange}
                  pageRangeDisplayed={5}
                  prevPageText={<FontAwesomeIcon icon={['fa', 'angle-left']} />}
                  totalItemsCount={trending.total_pages || 1000}
              />
            </div>
          )}
      </div>
      </React.Fragment>
    );
  }
}

export default TrendingMovies;
