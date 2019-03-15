import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from './MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';
import Filter from '../layout/Filter';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions'; 

// let query = 'discover/movie?';

class DiscoverMovies extends Component {
  componentDidMount() {
    if (isEmpty(this.props.discoverMovies)) {
      this.fetchMovies();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter.discover.query !== this.props.filter.discover.query) {
      setTimeout(this.fetchMovies, 200);
    }
  }

  fetchMovies = (page = 1) => {
    const { query } = this.props.filter.discover;
    const path = 'discover/movie?';

    this.props.isCurrentlyFetching();
    this.props.fetchRequest('FETCH_DISCOVER_MOVIES', path + query, page);
  }

  handlePageChange = (e) => {
    if (this.props.discoverMovies.activePage !== e) {
      this.fetchMovies(e)
    }
  };

  onFilterToggle = () => {
    this.filterRef.classList.toggle('open');
  };

  
  onFilterClose = () => {
    this.filterRef.classList.remove('open');
  };

  render() {
    const { discoverMovies, isLoading, filter } = this.props;

    return (
      <React.Fragment>
        {isEmpty(discoverMovies) && <LoadingScreen />}
        <TopProgressLoader isLoading={isLoading} />
        <div className="container">
          <div className="container__wrapper">
            {!isEmpty(discoverMovies) && (
              <React.Fragment>
                <div className="movie__header">
                  <div className="movie__header-title">
                    <h1>Discover Movies</h1>
                    <h3>{numberWithCommas(discoverMovies.total_results)} Movies</h3>
                  </div>
                  <Filter 
                      filterCategory="discover"
                      filterData={filter.discover}
                      /* eslint no-return-assign: 0 */
                      filterRef={el => this.filterRef = el}
                      onFilterClose={this.onFilterClose}
                  />
                  <button 
                      className="filter__toggle"
                      onClick={this.onFilterToggle}
                  >
                    <FontAwesomeIcon 
                        icon={['fa', 'filter']} 
                        color="#dadada" 
                    />
                  </button>
                </div>  
                <div className="movie__wrapper">
                  {discoverMovies.collection.map((movie, index) => {
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
                    activePage={discoverMovies.activePage}
                    itemsCountPerPage={1}
                    onChange={this.handlePageChange}
                    pageRangeDisplayed={10}
                    totalItemsCount={discoverMovies.total_pages}
                    totalPage={discoverMovies.total_pages}
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

const mapStateToProps = ({ discoverMovies, isLoading, filter }) => ({
  discoverMovies,
  isLoading,
  filter
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMovies);
