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

const queryString = 'movie/popular?';

class PopularMovies extends Component {
  componentDidMount() {
    if (isEmpty(this.props.popularMovies)) {
      this.props.fetchRequest('FETCH_TOPRATED_MOVIES', queryString);
    }
  }

  handlePageChange = (e) => {
    if (this.props.popularMovies.page !== e && !this.props.isLoading) {
      this.props.isCurrentlyFetching();
      this.props.fetchRequest('FETCH_TOPRATED_MOVIES', queryString, e);
    }
  };

  render() {
    const { popularMovies, isLoading } = this.props;
    
    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isLoading} />
        {isEmpty(popularMovies) && <LoadingScreen />}
        <div className="container">
          <div className="container__wrapper container__movies">
            {!isEmpty(popularMovies) && (
              <React.Fragment>
                <div className="movie__header">
                  <div className="movie__header-title">
                    <h1>Popular Movies</h1>
                    <h3>{numberWithCommas(popularMovies.total_results)} Movies</h3>
                  </div>
                </div>
                <div className="movie__wrapper">
                  {popularMovies.results.map((movie, index) => {
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
                    activePage={popularMovies.page}
                    itemsCountPerPage={1}
                    onChange={this.handlePageChange}
                    pageRangeDisplayed={10}
                    totalItemsCount={popularMovies.total_pages}
                    totalPage={popularMovies.total_pages}
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

PopularMovies.propTypes = {
  fetchRequest: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  isLoading: PropTypes.bool,
  popularMovies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

const mapStateToProps = ({ popularMovies, isLoading }) => ({
  popularMovies,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovies);
