import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from './MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const queryString = 'trending/all/day?';

class TrendingMovies extends Component {
  state = {
    error: undefined
  };

  componentDidMount() {
    if (isEmpty(this.props.trendingMovies)) {
      this.fetchMovies();
    }
  }

  handlePageChange = (e) => {
    if (this.props.trendingMovies.page !== e && !this.props.isLoading) {
      this.fetchMovies(e);
    }
  };

  fetchMovies = (page = 1) => {
    this.props.isCurrentlyFetching();
    this.props.fetchRequest('FETCH_TRENDING_MOVIES', queryString, page)
      .then((status) => {
        if (status === 503) {
          this.setState({ error: 'Error connection' });
        } else if (status === 404) {
          this.setState({ error: 'Cannot fetch movies' });
        }
      });
  };

  render() {
    const { error } = this.state;
    const { trendingMovies, isLoading } = this.props;
    
    return (
      <React.Fragment>
        {(isLoading && isEmpty(trendingMovies)) && <LoadingScreen />}
        <div className="container">
          <div className="container__wrapper container__movies">
            {(!isEmpty(trendingMovies) && !error) && (
              <React.Fragment>
                <div className="movie__header">
                  <div className="movie__header-title">
                    <h1>Trending Movies</h1>
                    <h3>{numberWithCommas(trendingMovies.total_results)} Movies</h3>
                  </div>
                </div>
                <div className="movie__wrapper">
                  {trendingMovies.results.map((movie, index) => {
                    return (
                      <MovieCard 
                          category="movie"
                          key={`${movie.id}_${index}`}
                          movie={movie} 
                      />
                    )
                  })}
                </div>
                <PaginationBar 
                    activePage={trendingMovies.page}
                    itemsCountPerPage={1}
                    onChange={this.handlePageChange}
                    pageRangeDisplayed={10}
                    totalItemsCount={trendingMovies.total_pages}
                    totalPage={trendingMovies.total_pages}
              />
              <Footer />
              </React.Fragment>
            )}
          </div>  
          {error && (
            <div className="error">
              <h1>{error}</h1>
              <button 
                  className="button--primary m-auto"
                  onClick={() => {
                    window.location.reload();
                  }}
              >
                Retry
              </button>
            </div>
          )}
      </div>
      </React.Fragment>
    );
  }
}

TrendingMovies.propTypes = {
  fetchRequest: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  trendingMovies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

const mapStateToProps = ({ trendingMovies, isLoading }) => ({
  trendingMovies,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingMovies);
