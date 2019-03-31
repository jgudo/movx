import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from './MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';
import Filter from '../layout/Filter';

// actions
import { fetchTvShows, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

class TvShows extends Component {
  componentDidMount() {
    if (isEmpty(this.props.tvShows)) {
      this.fetchMovies();
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.filter.tv.query !== this.props.filter.tv.query) {
      setTimeout(this.fetchMovies, 200);
    }
  }

  fetchMovies = (page = 1) => {
    const { query } = this.props.filter.tv;
    const path = 'discover/tv?&language=en-US';

    this.props.isCurrentlyFetching();
    this.props.fetchTvShows(path + query, page);
  }

  handlePageChange = (e) => {
    if (this.props.tvShows.page !== e) {
      this.fetchMovies(e);
    }
  };

  render() {
    const { tvShows, isLoading, filter } = this.props;
  
    return (
      <React.Fragment>
        {(isEmpty(tvShows) && isLoading) && <LoadingScreen />}
        {!isEmpty(tvShows) && (
          <div className="container">
            <div className="container__wrapper container__movies">
              <div className="movie__header">
                <div className="movie__header-title">
                  <h1>TV Shows</h1>
                  <h3>{numberWithCommas(tvShows.total_results)} TV Shows</h3>
                </div> 
                <Filter 
                    filterCategory="tv"
                    filterData={filter.tv}
                /> 
              </div>
            <div className="movie__wrapper">
              {tvShows.results.map(show => (
                <MovieCard 
                    category="tv"
                    key={show.id}
                    movie={show} 
                />
              ))}
            </div>
            {tvShows.total_pages > 1 && (
              <PaginationBar 
                  activePage={tvShows.page}
                  itemsCountPerPage={1}
                  onChange={this.handlePageChange}
                  pageRangeDisplayed={10}
                  totalItemsCount={tvShows.total_pages}
                  totalPage={tvShows.total_pages}
              />
            )}
            <Footer />
            </div>    
          </div>
        )}
      </React.Fragment>
    );
  }
}

TvShows.propTypes = {
  fetchRequest: PropTypes.func,
  filter: PropTypes.objectOf(PropTypes.object),
  isCurrentlyFetching: PropTypes.func,
  tvShows: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

const mapStateToProps = ({ tvShows, filter, isLoading }) => ({
  tvShows,
  filter,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchTvShows: (url, page) => dispatch(fetchTvShows(url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(TvShows);
