import React, { Component } from 'react';
import { connect } from 'react-redux';

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

class DiscoverMovies extends Component {
  state = {
    yearFilter: '',
    sortFilter: '',
    genreFilter: '',
    query: 'discover/movie?'
  };

  componentDidMount() {
    if (isEmpty(this.props.discoverMovies)) {
      this.fetchMovies();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchMovies();
    }
  }

  fetchMovies = (page = 1) => {
    this.props.isCurrentlyFetching();
    this.props.fetchRequest('FETCH_DISCOVER_MOVIES', this.state.query, page);
  }

  updateQuery = () => {
    const { yearFilter, sortFilter, genreFilter } = this.state;
    const year = yearFilter ? `&year=${yearFilter}` : '';
    const sort = sortFilter ? `&sort_by=${sortFilter}` : '';
    const genre = genreFilter ? `&with_genres=${genreFilter}` : '';
    const newQuery = `discover/movie?${year + sort + genre}`;
    this.setState({ query: newQuery });
  };

  onYearFilterChange = (e) => {
    const selected = e.target.value;
    this.setState({ yearFilter: selected }, () => {
      this.updateQuery();
    });
  };

  onSortFilterChange = (e) => {
    const selected = e.target.value;
    this.setState({ sortFilter: selected }, () => {
      this.updateQuery();
    });
  };

  onGenreFilterChange = (e) => {
    const selected = e.target.value;
    this.setState({ genreFilter: selected }, () => {
      this.updateQuery();
    });
  };

  handlePageChange = (e) => {
    if (this.props.discoverMovies.activePage !== e) {
      this.fetchMovies(e);
    }
  };

  render() {
    const { discoverMovies, isLoading } = this.props;

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
                      onGenreFilterChange={this.onGenreFilterChange} 
                      onSortFilterChange={this.onSortFilterChange}
                      onYearFilterChange={this.onYearFilterChange} 
                  />
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

const mapStateToProps = ({ discoverMovies, isLoading }) => ({
  discoverMovies,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMovies);
