import React, { Component } from 'react';
import axios from 'axios';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from '../movies/MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const tmdb = 'https://api.themoviedb.org/3/';
const tmdbKey = process.env.TMDB_KEY;

class Search extends Component {
  state = {
    search: {},
    loaded: false,
    isFetching: false,
    isFetching: false,
    error: undefined
  };
  
  componentDidMount() {
    const queryString = this.props.match.params.query;
    this.searchMovies(queryString);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.query !== nextProps.match.params.query) {
      this.searchMovies(nextProps.match.params.query);
    }
  }

  searchMovies = (queryString, page = 1) => {
    this.setState({ loaded: false });
    axios.get(`${tmdb}search/movie?api_key=${tmdbKey}&query=${queryString}&page=${page}`)
      .then((response) => {
        const search = response.data;
        this.setState(() => ({ 
          search,
          loaded: true,
          error: undefined 
        }));
        window.scrollTo(null, 0);
      })
      .catch((e) => {
        console.log('Cannot perform search', e);
        this.setState(() => ({
          loaded: true,
          error: 'No result found'
        }));
      });
  };

  handlePageChange = (e) => {
    if (this.state.search.page !== e) {
      this.searchMovies(this.props.match.params.query, e);
    }
  };

  render() {
    const { 
      search,
      loaded,
      isFetching
    } = this.state;
    
    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isFetching} />
        {!loaded && <LoadingScreen />}
        <div className="container">
          <div className="container__wrapper">
            {!isEmpty(search) && (
              <React.Fragment>
                <div className="movie__header">
                  <div className="movie__header-title">
                    <h1>Search Result</h1>
                    <h3>Found 
                      &nbsp;
                      {numberWithCommas(search.total_results)} 
                      &nbsp;
                      Result With Title: 
                      <span className="result__keyword">
                        &nbsp;{this.props.match.params.query}
                      </span>
                    </h3>
                  </div>
                </div>
                <div className="movie__wrapper">
                  {search.results.map((movie, index) => {
                    return (
                      <MovieCard 
                          category="movie"
                          key={`${movie.id}_${index}`}
                          movie={movie} 
                      />
                    )
                  })}
                </div>
                {search.results.length >= 1 && (
                  <React.Fragment>
                    <PaginationBar 
                        activePage={search.page}
                        itemsCountPerPage={1}
                        onChange={this.handlePageChange}
                        pageRangeDisplayed={10}
                        totalItemsCount={search.total_pages}
                        totalPage={search.total_pages}
                    />  
                    <Footer />
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>  
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
