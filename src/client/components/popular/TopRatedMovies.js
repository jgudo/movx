import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from '../movies/MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const queryString = 'movie/top_rated?';

class TopRatedMovies extends Component {
  componentDidMount() {
    if (isEmpty(this.props.topRatedMovies)) {
      this.props.fetchRequest('FETCH_TOPRATED_MOVIES', queryString);
    }
  }

  handlePageChange = (e) => {
    if (this.props.topRatedMovies.page !== e && !this.props.isLoading) {
      this.props.isCurrentlyFetching();
      this.props.fetchRequest('FETCH_TOPRATED_MOVIES', queryString, e);
    }
  };

  render() {
    const { topRatedMovies, isLoading } = this.props;
    
    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isLoading} />
        {isEmpty(topRatedMovies) && <LoadingScreen />}
        <div className="container">
          <div className="container__wrapper container__movies">
            {!isEmpty(topRatedMovies) && (
              <React.Fragment>
                <div className="movie__header">
                  <div className="movie__header-title">
                    <h1>Top Rated Movies</h1>
                    <h3>{numberWithCommas(topRatedMovies.total_results)} Movies</h3>
                  </div>
                </div>
                <div className="movie__wrapper">
                  {topRatedMovies.results.map((movie, index) => {
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
                    activePage={topRatedMovies.page}
                    itemsCountPerPage={1}
                    onChange={this.handlePageChange}
                    pageRangeDisplayed={10}
                    totalItemsCount={topRatedMovies.total_pages}
                    totalPage={topRatedMovies.total_pages}
              />
              <Footer />
              </React.Fragment>
            )}
          </div>  
      </div>
      </React.Fragment>
    );
  }
}

TopRatedMovies.propTypes = {
  fetchRequest: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  isLoading: PropTypes.bool,
  topRatedMovies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

const mapStateToProps = ({ topRatedMovies, isLoading }) => ({
  topRatedMovies,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRatedMovies);
