import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from './MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const queryString = 'discover/movie?language=en-US&sort_by=popularity.desc&include_video=false';

class DiscoverMovies extends Component {
  state = {
    movies: {}
  };

  componentDidMount() {
    if (isEmpty(this.props.discoverMovies)) {
      this.props.fetchRequest('FETCH_DISCOVER_MOVIES', queryString);
    }
  }

  handlePageChange = (e) => {
    if (this.props.discoverMovies.activePage !== e) {
      this.props.isCurrentlyFetching();
      this.props.fetchRequest('FETCH_DISCOVER_MOVIES', queryString, e);
    }
  };

  render() {
    const { discoverMovies, isLoading } = this.props;

    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isLoading} />
        {isEmpty(discoverMovies) && <LoadingScreen />}
        <div className="container">
          <div className="container__wrapper">
            {!isEmpty(discoverMovies) && (
              <React.Fragment>
                <div className="movie__header">
                  <div className="movie__header-title">
                    <h1>Discover Movies</h1>
                    <h3>{numberWithCommas(discoverMovies.total_results)} Movies</h3>
                  </div>
                </div>  
                <div className="movie__wrapper">
                  {discoverMovies.collection.map((movie) => {
                    return (
                      <MovieCard 
                          category="movie"
                          key={movie.id}
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
