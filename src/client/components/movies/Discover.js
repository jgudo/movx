import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-js-pagination';


import TopProgressLoader from '../layout/TopProgressLoader'; 
import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from '../card/MovieCard';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import isEmpty from '../../helpers/helperFunctions';

const queryString = 'discover/movie?language=en-US&sort_by=popularity.desc&include_video=false';

class DiscoverMovies extends Component {
  state = {
    movies: {}
  };

  componentDidMount() {
    if (isEmpty(this.props.discoverMovies))
      this.props.fetchRequest('FETCH_DISCOVER_MOVIES', queryString);
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
            <div className="movie__header">
              <h1>Discover Movies</h1>
            </div>    
            <div className="movie__wrapper">
              {!isEmpty(discoverMovies) && discoverMovies.collection.map((movie) => {
                return (
                  <MovieCard 
                      category="movie"
                      key={movie.id}
                      movie={movie} 
                  />
                )
              })}
            </div>
            <div className="pagination__wrapper">
            {!isEmpty(discoverMovies) && (
              <Pagination
                  activePage={discoverMovies.activePage || 1}
                  firstPageText={<FontAwesomeIcon icon={['fa', 'angle-double-left']} />}
                  itemsCountPerPage={10}
                  lastPageText={<FontAwesomeIcon icon={['fa', 'angle-double-right']} />}
                  nextPageText={<FontAwesomeIcon icon={['fa', 'angle-right']} />}
                  onChange={this.handlePageChange}
                  pageRangeDisplayed={5}
                  prevPageText={<FontAwesomeIcon icon={['fa', 'angle-left']} />}
                  totalItemsCount={discoverMovies.total_pages || 1000}
              />
            )}
            </div>
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
