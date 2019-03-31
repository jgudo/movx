import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from './MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// actions
import { fetchTrendingMovies, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

class TrendingMovies extends Component {
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
    this.props.fetchTrendingMovies('trending/all/day?', page);
  };

  render() {
    const { trendingMovies, isLoading } = this.props;
    
    return (
      <React.Fragment>
        {(isEmpty(trendingMovies) && isLoading) && <LoadingScreen />}
        {!isEmpty(trendingMovies) && (
          <div className="container">
            <div className="container__wrapper container__movies">
              <div className="movie__header">
                <div className="movie__header-title">
                  <h1>Trending Movies</h1>
                  <h3>{numberWithCommas(trendingMovies.total_results)} Movies</h3>
                </div>
              </div>
              <div className="movie__wrapper">
                {trendingMovies.results.map((movie, index) => (
                  <MovieCard 
                      category="movie"
                      key={`${movie.id}_${index}`}
                      movie={movie} 
                  />
                ))}
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
            </div>  
          </div>
        )}
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
  fetchTrendingMovies: (query, page) => dispatch(fetchTrendingMovies(query, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingMovies);
